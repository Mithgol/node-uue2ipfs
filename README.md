[![(a histogram of downloads)](https://nodei.co/npm-dl/uue2ipfs.png?height=3)](https://npmjs.org/package/uue2ipfs)

This module (`uue2ipfs`) finds [uuencoded](http://en.wikipedia.org/wiki/Uuencoding) files in text messages, decodes those files and publishes them in [IPFS](https://ipfs.io/) (InterPlanetary File System, aka the Permanent Web, aka the Distributed Web).

This module's name is derived from loosely abbreviated words “UUE to IPFS” after a common `.UUE` suffix for Fidonet echomail areas where uuencoded files are posted (sometimes the results of such encoding are also known as “UUE codes”).

This module is written in JavaScript and requires [Node.js](http://nodejs.org/) to run. Some ECMAScript 2016 features are used, and thus a relatively recent Node.js (version 6.8.1 or newer) is required. This module is tested against the latest stable version of Node.js.

This module is currently in an early phase of its development and thus does not have the desired level of feature completeness.

## Installing uue2ipfs

[![(npm package version)](https://nodei.co/npm/uue2ipfs.png?downloads=true&downloadRank=true)](https://npmjs.org/package/uue2ipfs)

* Latest packaged version: `npm install uue2ipfs`

* Latest githubbed version: `npm install https://github.com/Mithgol/node-uue2ipfs/tarball/master`

You may visit https://github.com/Mithgol/node-uue2ipfs#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Testing uue2ipfs

[![(build testing status)](https://img.shields.io/travis/Mithgol/node-uue2ipfs/master.svg?style=plastic)](https://travis-ci.org/Mithgol/node-uue2ipfs)

It is necessary to install [JSHint](http://jshint.com/) for testing.

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of uue2ipfs).

After that you may run `npm test` (in the directory of uue2ipfs). Only the JS code errors are caught; the code's behaviour is not tested.

## License

MIT license (see the `LICENSE` file).
