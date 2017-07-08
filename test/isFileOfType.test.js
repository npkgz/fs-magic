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
            _assert.ok('dev' in result, 'Contains dev entry');
            _assert.ok('mode' in result, 'Contains mode entry');
            _assert.ok('nlink' in result, 'Contains nlink entry');
            _assert.ok('uid' in result, 'Contains uid entry');
            _assert.ok('gid' in result, 'Contains gid entry');
            _assert.ok('rdev' in result, 'Contains rdev entry');
            _assert.ok('blksize' in result, 'Contains blksize entry');
            _assert.ok('ino' in result, 'Contains ino entry');
            _assert.ok('size' in result, 'Contains size entry');
            _assert.ok('blocks' in result, 'Contains blocks entry');
            _assert.ok('atime' in result, 'Contains atime entry');
            _assert.ok('mtime' in result, 'Contains mtime entry');
            _assert.ok('ctime' in result, 'Contains ctime entry');
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