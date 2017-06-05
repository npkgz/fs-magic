const _fs = require('../fs-magic');
const _path = require('path');
const _assert = require('assert');
let _refChecksums = require('./checksums.json');
const _testfile = _path.join(__dirname, 'random.bin');

// isFileOfType testing
describe('isFileOfType', function(){
 
    // directory within the fs test will executed
    let tmpDir = null;

    // create tmp dir
    before(async function(){
        // initialize tmp dir
       tmpDir = await _fs.mkdtemp('/tmp/test-');
    });

    it('should return false in case a file not found error has been thrown', function(){
       return _fs.isFileOfType(tmpDir + '/unkownFile.txt', () => null).then(function(result){
            _assert.strictEqual(result, false);
        });
    });

    it('should return a stat object of the item (test type)', function(){
       return _fs.isFileOfType(_testfile, (s) => s).then(function(result){
            _assert.equal(typeof result, 'object');
        });
    });

    it('should return a stat object of the item (test keys)', function(){
       return _fs.isFileOfType(_testfile, (s) => s).then(function(result){
           const keys = ['dev', 'mode','nlink', 'uid', 'gid', 'rdev', 'blksize', 'ino', 'size', 'blocks', 'atime', 'mtime', 'ctime','birthtime' ];
            _assert.deepEqual(Object.keys(result), keys);
        });
    });

    it('should return true in case a item is of type file', function(){
       return _fs.isFileOfType(_testfile, (s) => s.isFile()).then(function(result){
            _assert.equal(result, true);
        });
    });

    it('should return false in case a item is not of type file', function(){
       return _fs.isFileOfType(_path.dirname(__dirname), (s) => s.isFile()).then(function(result){
            _assert.equal(result, false);
        });
    });
    
});