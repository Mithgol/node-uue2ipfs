var async = require('async');
var MIME = require('mime');
var UUE = require('uue');

var imgMIME = () => [
   'image/jpeg',
   'image/png',
   'image/gif',
   'image/svg+xml'
];

var imgUUE2IPFS = (msgText, converter, options, cbDone) => {
   if( typeof options.concurrency === 'undefined' ) options.concurrency = 2;
   async.mapLimit(
      UUE.split(msgText),
      options.concurrency, // concurrency of `.mapLimit`
      (nextChunk, doneChunk) => {
         if( typeof nextChunk === 'string' ) return setImmediate(() =>
            doneChunk(null, nextChunk) // not an UUE
         );

         if( Array.isArray(options.filterMIME) ){
            if(!( // determine the MIME type (by looking at the filename)
               options.filterMIME.includes( MIME.getType(nextChunk.name) )
            )) return setImmediate(() =>
               doneChunk(null, nextChunk.source) // UUE; but won't convert it
            );
         }

         options.API.add(nextChunk.data, (err, resultIPFS) => {
            if( err ) return doneChunk(err);
            if( !resultIPFS ) return doneChunk(new Error(
               'Error putting an uudecoded file to IPFS.'
            ));
            if(!( Array.isArray(resultIPFS) )) return doneChunk(new Error(
               'Not an Array received (putting an uudecoded file to IPFS).'
            ));
            if( resultIPFS.length !== 1 ) return doneChunk(new Error(
               'Weird array received (putting an uudecoded file to IPFS).'
            ));
            var hashIPFS = resultIPFS[0].hash;
            if( typeof hashIPFS === 'undefined' ) return doneChunk(new Error(
               'Undefined hash (putting an uudecoded file to IPFS).'
            ));
            nextChunk.hash = hashIPFS;
            converter(nextChunk, doneChunk);
         });
      },
      (err, resultChunks) => {
         if( err ) return cbDone(err);

         cbDone(null, resultChunks.join(''));
      }
   );
};

module.exports = {
   imgMIME: imgMIME,
   UUE2IPFS: imgUUE2IPFS
};