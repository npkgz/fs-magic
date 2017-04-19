const _fs = require('../fs-magic');

(async function(){
    try{
        // zip a file
        await _fs.gzip('test1.js', './test1111.gz');

        // unzip a file
        await _fs.gunzip('./test1111.gz', './test1-uncompressed.js');
    }catch (e){
        console.error(e.message);
    }

})();
