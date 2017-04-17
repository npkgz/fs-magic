const _fs = require('fs');

// open read stream
async function FileInputStream(src){
    // wrap into Promise
    return new Promise(function(resolve, reject){

         // open read stream
        istream = _fs.createReadStream(src);
        istream.on('error', reject);
        istream.on('open', function(){
            resolve(istream);
        });
    });
}

module.exports = FileInputStream;