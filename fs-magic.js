// basic, promisified functions
let _fs = require('./lib/fs-promised');

// addons
_fs.exists = require('./lib/exists');
_fs.copy = require('./lib/copy');
_fs.bulkCopy = require('./lib/bulkCopy');
_fs.mkdirp = require('./lib/mkdirp');
_fs.FileInputStream = require('./lib/FileInputStream');
_fs.FileOutputStream = require('./lib/FileOutputStream');

module.exports = _fs;