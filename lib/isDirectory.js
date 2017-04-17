const _oftype = require('./isFileOfType');

// check if node is directory
async function isDirectory(filename){
    return await _oftype(filename, (stats) => stats.isDirectory());
};

module.exports = isDirectory;