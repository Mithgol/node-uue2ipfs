[![(a histogram of downloads)](https://nodei.co/npm-dl/uue2ipfs.png?height=3)](https://npmjs.org/package/uue2ipfs)

This module (`uue2ipfs`) finds [uuencoded](http://en.wikipedia.org/wiki/Uuencoding) files in text messages, decodes those files and publishes them in [IPFS](https://ipfs.io/) (InterPlanetary File System, aka the Permanent Web, aka the Distributed Web).

This module's name is derived from loosely abbreviated words “UUE to IPFS” after a common `.UUE` suffix for Fidonet echomail areas where uuencoded files are posted (sometimes the results of such encoding are also known as “UUE codes”).

This module is written in JavaScript and requires [Node.js](http://nodejs.org/) to run. Some ECMAScript 2016 features are used, and thus a relatively recent Node.js (version 6.0.0 or newer) is required. This module is tested against the latest stable version of Node.js.

## Installing uue2ipfs

[![(npm package version)](https://nodei.co/npm/uue2ipfs.png?downloads=true&downloadRank=true)](https://npmjs.org/package/uue2ipfs)

* Latest packaged version: `npm install uue2ipfs`

* Latest githubbed version: `npm install https://github.com/Mithgol/node-uue2ipfs/tarball/master`

You may visit https://github.com/Mithgol/node-uue2ipfs#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Using uue2ipfs

When you `require()` the installed module, you get an object that has the following methods:

## UUE2IPFS(msgText, converter, settings, finalCallback)

This method finds files in text messages, decodes those files, asynchronously publishes them in IPFS. You may define your `converter` that receives IPFS hashes and defines further textual representation of files that replaces their UUE codes in the text of the original message.

This method has the following parameters:

* `msgText` — the text of the original Fidonet message. This method splits that text into an array of textual blocks (JavaScript string) and UUE blocks. Then UUE blocks are decoded. The decoded files are published in IPFS and the results are given to the `converter`.

* `converter(fileData, callback)` — this function is called once for each of the decoded files. It receives the following parameters:
   * `fileData` — an object of details about a file that was decoded and published. It has the following fields:
      * `name` — the file's name (as it appeared in UUE codes);
      * `data` — a Node.js [Buffer](http://nodejs.org/docs/latest/api/buffer.html) containing the file's decoded contents.
      * `source` — a JavaScript string containing source UUE codes of the file from (and including) the beginning `'begin'` to (and including) the final `'end'`.
         * **Note.**   A line separator `'\n'` (`\x0A`) that immediately precedes or follows a UUE block does not become a part of that block; instead of it such separator becomes a part of an adjacent JavaScript string in the aforementioned array of blocks.
      * `hash` — an IPFS hash of the published file.
      * `type` — always the JavaScript string `'UUE'`. Might help in writing universal converters that differentiate between UUE blocks and some other sources of files.
   * `callback(error, converted)` — a callback to call when the textual representation of a file is defined. It has the following parameters:
      * `error` — if some error (a truthy value) appears here, then `UUE2IPFS` stops and reports that error to its `finalCallback`.
      * `converted` — a JavaScript string that defines further textual representation of the published file (i.e. the file's appearance in the text that replaces its uuencoded appearance). Examples:
         * `callback(null, fileData.source)` — the converter decides that the file continues to appear uuencoded. (The converter might still do something with the hash, though.)
         * `callback(null, '<img src="https://ipfs.io/ipfs/' + fileData.hash + '">')` — the converter decides to replace the UUE codes with an HTML code of an image that uses an IPFS URL relative to the default gateway.
         * `callback(null, '')` — the converter decides to erase the file's UUE codes from the text.

* `settings` — an object of settings that control the process of publishing and converting of the files. This object has the following fields:
   * `API` — an instance of [JS IPFS API](https://github.com/ipfs/js-ipfs-api) to be used for the publishing of the decoded files. (Required.) For example, `require('ipfs-api')('localhost', '5001')`.
   * `concurrency` — a number of how many decoded files are expected to be published simultaneously. A greater number speeds thing up, but the publishing generates more traffic to the IPFS and also it does not immediately stop if an error is passed to the callback. (Optional. By default, `2`.)
   * `filterMIME` — if present and an `Array`, contains a list of MIME types. A file is given to a converter only if its MIME type is listed. For example, `require('uue2ipfs').imgMIME()` (see below) means that `converter` should process only images. (Optional. By default, all files are processed.)
         * **Note.**   A file's MIME type is determined by the [`mime`](https://github.com/broofa/node-mime) module that looks only at the file's name (`fileData.name`). The file's contents are not processed.

* `finalCallback(error, finalText)` — a function that is called when the `UUE2IPFS` method finishes. It has the following parameters:
   * `error` — an error, if the `UUE2IPFS` method finished prematurely.
   * `finalText` — a JavaScript string that results from concatenating elements of the array that resulted from `msgText` being split into an array of textual blocks (JavaScript string) and UUE blocks. These blocks are concatenated in the order of appearance (as they appeared in `msgText`). Textual blocks are used verbatim (“as is”); UUE blocks are replaced by the results (`converted` strings) that were returned from `converter`.

Lines in the given `msgText` are expected to be separated by `'\n'` (`\x0A`).

Invalid UUE codes are ignored entirely (even if only one line of some UUE code block is wrong, that code block is not decoded and instead is returned as a part of some text block).

## imgMIME()

This method returns an array of the following JavaScript strings: `['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']`.

These are MIME types of images. They're useful as `settings.filterMIME` where the `converter` should process only images.

## Testing uue2ipfs

[![(build testing status)](https://img.shields.io/travis/Mithgol/node-uue2ipfs/master.svg?style=plastic)](https://travis-ci.org/Mithgol/node-uue2ipfs)

It is necessary to install [JSHint](http://jshint.com/) for testing.

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of uue2ipfs).

After that you may run `npm test` (in the directory of uue2ipfs). Only the JS code errors are caught; the code's behaviour is not tested.

## License

MIT license (see the `LICENSE` file).
