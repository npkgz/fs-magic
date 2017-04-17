const _fs = require('fs');
const _thenifyAll = require('thenify-all');

// list of fs methods to promisify - all sync methods are ignored!
const fsApi = [
    'access',
    'appendFile',
    'chmod',
    'chown',
    'close',
    'fchmod',
    'fchown',
    'fdatasync',
    'fstat',
    'fsync',
    'ftruncate',
    'futimes',
    'lchown',
    'link',
    'lstat',
    'mkdir',
    'mkdtemp',
    'open',
    'read',
    'readFile',
    'readdir',
    'readlink',
    'realpath',
    'rename',
    'rmdir',
    'stat',
    'symlink',
    'truncate',
    'unlink',
    'utimes',
    'write',
    'writeFile'
];

// promisified versions
let fsPromised = _thenifyAll(_fs, {}, fsApi);

// copy some methods
fsPromised.constants = _fs.constants;
fsPromised.createReadStream = _fs.createReadStream;
fsPromised.createReadStream = _fs.createWriteStream;
fsPromised.watch = _fs.watch;
fsPromised.watchFile = _fs.watchFile; 

module.exports = fsPromised;