const _fs = require('../fs-magic');
const _path = require('path');
const _assert = require('assert');
let _refChecksums = require('./checksums.json');
const _testfile = _path.join(__dirname, 'random.bin');

// statx testing
describe('statx', function(){
 
    // directory within the fs test will executed
    let tmpDir = null;

    // create tmp dir
    before(async function(){
        // initialize tmp dir
       tmpDir = await _fs.mkdtemp('/tmp/test-');
    });

    it('should return false in case the file is not available', function(){
       return _fs.statx(tmpDir + '/unkownFile.txt').then(function(result){
            _assert.strictEqual(result, false);
        });
    });

    it('should return a stat object in case a file is available', function(){
       return _fs.statx(_testfile).then(function(result){
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

    it('should throw a access error in case the file is not accessible', function(){
        return _fs.statx('/root/xxx').then(function(result){
            _assert.fail('Should throw an error!');
        }).catch(function(e){
            _assert.equal(e.code, 'EACCES');
        })
    });
    
});