const _oftype = require('./isFileOfType');

// check if node is file
async function isFile(filename){
    return await _oftype(filename, (stats) => stats.isFile());
};

module.exports = isFile;