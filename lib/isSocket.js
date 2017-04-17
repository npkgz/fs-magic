const _oftype = require('./isFileOfType');

// check if node is socket
async function isSocket(filename){
    return await _oftype(filename, (stats) => stats.isSocket());
};

module.exports = isSocket;