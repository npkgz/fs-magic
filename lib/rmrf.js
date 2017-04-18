const _path = require('path');
const _fs = require('./fs-promised');
const _scandir = require('./scandir');

// remove directory recursivly (all items within)
async function rmrf(dir){
    // get all items of given directory
    const [files, dirs] = await _fs.scandir(dir);

}

module.exports = rmrf;