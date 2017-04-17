const _fs = require('fs');

// "modern" exists implmentation
async function exists(filedir){
    // promise wrapper
    return new Promise(function(resolve, reject){
        // try to stat the file
        _fs.stat(filedir, function(err){
            resolve(!err)
        });
    });
};

module.exports = exists;