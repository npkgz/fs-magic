const _fs = require('../fs-magic');
const _path = require('path');
const _assert = require('assert');
let _refChecksums = require('./checksums.json');
const _testfile = _path.join(__dirname, 'random.bin');

// symlonl type testing
describe('isSymlink', function(){
 
    // directory within the fs test will executed
    let tmpDir = null;
    let link = null;

    // create tmp dir
    before(async function(){
        // initialize tmp dir
       tmpDir = await _fs.mkdtemp('/tmp/test-');

       link = _path.join(tmpDir, 'link.bin');

       // create symlink
       await _fs.symlink(_testfile, link);
    });

    it('should return false in case the symlink is not available', function(){
       return _fs.isSymlink(tmpDir + '/unkownFile.txt').then(function(result){
            _assert.strictEqual(result, false);
        });
    });

    it('should return true in case a symlink is available', function(){
       return _fs.isSymlink(link).then(function(result){
            _assert.strictEqual(result, true);
        });
    });

    it('should return false in case the item is a file', function(){
       return _fs.isSymlink(_testfile).then(function(result){
            _assert.strictEqual(result, false);
        });
    });
    
});