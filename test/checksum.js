const _fsm = require('../fs-magic');

(async function(){

    const filename = 'test1111.gz';

    try{
        console.log("MD5   ", await _fsm.md5file(filename));
        console.log("SHA1  ", await _fsm.sha1file(filename));
        console.log("SHA256", await _fsm.sha256file(filename));
        console.log("SHA384", await _fsm.sha384file(filename));
        console.log("SHA512", await _fsm.sha512file(filename));


    }catch(e){
        console.error(e);
    }


})();