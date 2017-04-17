// basic, promisified functions
let _fs = require('./lib/fs-promised');

// addons
_fs.exists = require('./lib/exists');
_fs.copy = require('./lib/copy');
_fs.bulkCopy = require('./lib/bulkCopy');
_fs.mkdirp = require('./lib/mkdirp');
_fs.FileInputStream = require('./lib/FileInputStream');
_fs.FileOutputStream = require('./lib/FileOutputStream');
_fs.isDirectory = require('./lib/isDirectory');
_fs.isFile = require('./lib/isFile');
_fs.isSocket = require('./lib/isSocket');
_fs.isSymlink = require('./lib/isSymlink');
_fs.isFileOfType = require('./lib/isFileOfType');
_fs.untar = require('./lib/untar');
_fs.untgz = require('./lib/untgz');

module.exports = _fs;