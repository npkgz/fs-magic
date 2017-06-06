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
            const keys = ['dev', 'mode','nlink', 'uid', 'gid', 'rdev', 'blksize', 'ino', 'size', 'blocks', 'atime', 'mtime', 'ctime','birthtime' ];
            _assert.deepEqual(Object.keys(result), keys);
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