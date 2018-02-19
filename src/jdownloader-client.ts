import { IAddLinksQuery } from './interfaces/AddLinksQuery'
import { ICrawledLink } from './interfaces/CrawledLink'
import { ICrawledLinkQuery } from './interfaces/CrawledLinkQuery'
import { IDirectConnectionInfos } from './interfaces/DirectConnectionInfos'
import { IDownloadLink } from './interfaces/DownloadLink'
import { IFilePackage } from './interfaces/FilePackage'
import { ILinkCollectingJob } from './interfaces/LinkCollectingJob'
import { ILinkQuery } from './interfaces/LinkQuery'
import { IPackageQuery } from './interfaces/PackageQuery'

import { JDownloaderCryptoSuite } from './jdownloader-crypto-suite'

export class JDownloaderClient extends JDownloaderCryptoSuite {
  constructor(
    email: string,
    password: string,
    appKey = 'jdownloader-api-indev',
    apiVer = 1
  ) {
    super({ email, password, appKey, apiVer })
  }

  /**
   * List links in the downloads section
   *
   * [Official docs](https://my.jdownloader.org/developers/#tag_143)
   * @param {string} deviceId The ID of the device
   */
  public downloadsQueryLinks(
    deviceId: string,
    options: ILinkQuery = {}
  ): Promise<IDownloadLink[]> {
    return this.callDevice('/downloadsV2/queryLinks', deviceId, options).then(
      response => response.data
    )
  }

  /**
   * List links in the link grabber section
   *
   * [Official docs](https://my.jdownloader.org/developers/#tag_267)
   * @param {string} deviceId The ID of the device
   */
  public linkGrabberQueryLinks(
    deviceId: string,
    options: ICrawledLinkQuery = {}
  ): Promise<ICrawledLink[]> {
    return this.callDevice('/linkgrabberv2/queryLinks', deviceId, options).then(
      response => response.data
    )
  }

  /**
   * TODO: Document this
   *
   * [Official docs](https://my.jdownloader.org/developers/#tag_80)
   * @param deviceId The ID of the device
   */
  public getDirectConnectionInfos(
    deviceId: string
  ): Promise<IDirectConnectionInfos> {
    return this.callDevice('/device/getDirectConnectionInfos', deviceId).then(
      response => response.data
    )
  }

  /**
   * Adds links to the Link Grabber
   *
   * [Official docs](https://my.jdownloader.org/developers/#tag_245)
   * @param deviceId The ID of the device
   */
  public linkGrabberAddLinks(
    deviceId: string,
    options: IAddLinksQuery
  ): Promise<ILinkCollectingJob> {
    return this.callDevice('/linkgrabberv2/addLinks', deviceId, {...options, links: options.links.join(' ')}).then(
      response => response.data
    )
  }

  /**
   * TODO: document this
   *
   * [Official docs](https://my.jdownloader.org/developers/#tag_146)
   */
  public downloadsQueryPackages(
    deviceId: string,
    options: IPackageQuery = {}
  ): Promise<IFilePackage[]> {
    return this.callDevice('/downloadsV2/queryPackages', deviceId, options).then(
      response => response.data
    )
  }
}
