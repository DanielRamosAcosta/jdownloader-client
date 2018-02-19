# jdownloader-client

Node.js JDownloader client, written in TypeScript based in [jdownloader-api](https://www.npmjs.com/package/jdownloader-api).

## Installation

```
npm i --save jdownloader-client
```

## Usage

```javascript
const { JDownloaderClient } = require('jdownloader-client')

async function main() {
  const client = new JDownloaderClient('<email>', '<password>')
  await client.connect()
  const devices = await client.listDevices()
  const downloadLinks = await client.downloadsQueryLinks(devices[0].id)
  console.log(downloadLinks)
}

main()
  .then(() => console.log('Done'))
  .catch(err => console.error(err))
```

## Implemented methods

* [`/device`](https://my.jdownloader.org/developers/#tag_79)
   * [`/getDirectConnectionInfos`](https://my.jdownloader.org/developers/#tag_80)
* [`/downloadsV2`](https://my.jdownloader.org/developers/#tag_127)
   * [`/queryLinks`](https://my.jdownloader.org/developers/#tag_143)
   * [`/queryPackages`](https://my.jdownloader.org/developers/#tag_146)
* [`/linkgrabberv2`](https://my.jdownloader.org/developers/#tag_239)
   * [`/addLinks`](https://my.jdownloader.org/developers/#tag_245)
   * [`/queryLinks`](https://my.jdownloader.org/developers/#tag_267)
