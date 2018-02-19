export interface IDirectConnectionInfos {
  infos: Array<{ ip: string; port: number }>
  mode: 'LAN'
  rebindProtectionDetected: boolean
}
