import axios from 'axios'
import * as crypto from 'crypto'
import * as querystring from 'querystring'

import { createEncryptionToken, decrypt, encrypt, sha256 } from './utils/crypto'
import { errorParser, parse, uniqueRid, validateRid } from './utils/utils'

export interface IConnectResponse {
  sessiontoken: string
  regaintoken: string
  rid: number
}

export enum DeviceStatus {
  UNKNOWN = 'UNKNOWN'
}

export interface IDevice {
  id: string
  type: 'jd'
  name: string
  status: DeviceStatus
}

export class JDownloaderCryptoSuite {
  private loginSecret: Buffer
  private deviceSecret: Buffer
  private sessionToken: string | null
  private regainToken: string | null
  private serverEncryptionToken: Buffer | null
  private deviceEncryptionToken: Buffer | null
  private email: string
  private appKey: string
  private apiVer: number

  constructor({
    email,
    password,
    appKey = 'jdownloader-api-indev',
    apiVer = 1
  }: {
    email: string
    password: string
    appKey?: string
    apiVer?: number
  }) {
    this.loginSecret = sha256(email + password + 'server')
    this.deviceSecret = sha256(email + password + 'device')
    this.sessionToken = null
    this.regainToken = null
    this.serverEncryptionToken = null
    this.deviceEncryptionToken = null
    this.email = email
    this.appKey = appKey
    this.apiVer = apiVer
  }

  /**
   * Connect to MyJDownloader with the credentils provided in the constructor
   */
  public connect() {
    return this.callServer('/my/connect', this.loginSecret, {
      appkey: this.appKey,
      email: this.email
    }).then((data: IConnectResponse) => {
      this.sessionToken = data.sessiontoken
      this.regainToken = data.regaintoken

      this.serverEncryptionToken = createEncryptionToken(
        this.loginSecret,
        this.sessionToken
      )
      this.deviceEncryptionToken = createEncryptionToken(
        this.deviceSecret,
        this.sessionToken
      )
    })
  }

  /**
   * Reconnects to MyJDownloader with the credentils provided in the constructor
   */
  public reconnect() {
    return this.callServer('/my/reconnect', this.serverEncryptionToken, {
      appkey: this.appKey,
      sessiontoken: this.sessionToken,
      regaintoken: this.regainToken // tslint:disable-line:object-literal-sort-keys
    }).then((data: IConnectResponse) => {
      this.sessionToken = data.sessiontoken
      this.regainToken = data.regaintoken

      this.serverEncryptionToken = createEncryptionToken(
        this.serverEncryptionToken,
        this.sessionToken
      )
      this.deviceEncryptionToken = createEncryptionToken(
        this.deviceSecret,
        this.sessionToken
      )
    })
  }

  /**
   * Discconects from JDownloaderAPI
   */
  public disconnect() {
    return this.callServer('/my/disconnect', this.serverEncryptionToken, {
      sessiontoken: this.sessionToken
    }).then(() => {
      this.sessionToken = null
      this.regainToken = null
      this.serverEncryptionToken = null
      this.deviceEncryptionToken = null
    })
  }

  /**
   * List available devices connected to MyJDownloader
   */
  public async listDevices(): Promise<IDevice[]> {
    this.checkIfConnected()
    return this.callServer('/my/listdevices', this.serverEncryptionToken, {
      sessiontoken: this.sessionToken
    }).then(response => response.list)
  }

  /**
   * Checks if the neccesary atributtes to query JDownloaderAPI are established
   */
  protected checkIfConnected() {
    if (
      !this.sessionToken ||
      !this.regainToken ||
      !this.serverEncryptionToken ||
      !this.deviceEncryptionToken
    ) {
      throw new Error(
        'You are not connected. First you must call "client.connect()"'
      )
    }
  }

  /**
   * Call the device with an action
   * @param {string} query The query to make to the device
   * @param {Buffer} deviceId The ID of the device
   * @param {Object} params The parameters to the query
   */
  protected async callDevice(
    query: string,
    deviceId: string,
    params?: object
  ): Promise<any> {
    this.checkIfConnected()

    const rid = uniqueRid()

    const body = encrypt(
      JSON.stringify(this.createBody(rid, query, params)),
      this.deviceEncryptionToken
    )

    return axios
      .post(
        'https://api.jdownloader.org/t_' +
          encodeURI(this.sessionToken) +
          '_' +
          encodeURI(deviceId) +
          query,
        body
      )
      .then(response => decrypt(response.data, this.deviceEncryptionToken))
      .then(parse)
      .then(validateRid(rid))
      .catch(errorParser)
      .catch(err => {
        return Promise.reject(
          new Error(decrypt(err.message, this.deviceEncryptionToken))
        )
      })
  }

  private createBody(rid: number, query: string, params?: object) {
    const baseBody = {
      apiVer: this.apiVer,
      rid,
      url: query
    }
    return params ? { ...baseBody, params: [JSON.stringify(params)] } : baseBody
  }

  /**
   * Call the server with an action
   * @param {string} query The query to make to the server
   * @param {Buffer} key The singing key
   * @param {Object} params The parameters to the query
   */
  private callServer(query: string, key: Buffer, params: object): Promise<any> {
    const rid = uniqueRid()
    const path =
      query +
      '?' +
      querystring.stringify({
        ...params,
        rid
      })

    const signature = crypto
      .createHmac('sha256', key)
      .update(path)
      .digest('hex')

    return axios
      .post(`https://api.jdownloader.org${path}&signature=${signature}`)
      .then(response => decrypt(response.data, key))
      .then(parse)
      .then(validateRid(rid))
      .catch(errorParser)
  }
}
