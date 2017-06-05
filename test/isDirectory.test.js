const _fs = require('../fs-magic');
const _path = require('path');
const _assert = require('assert');
let _refChecksums = require('./checksums.json');
const _testfile = _path.join(__dirname, 'random.bin');

// directory type testing
describe('isDirectory', function(){
 
    // directory within the fs test will executed
    let tmpDir = null;

    // create tmp dir
    before(async function(){
        // initialize tmp dir
       tmpDir = await _fs.mkdtemp('/tmp/test-');
    });

    it('should return false in case the directory is not available', function(){
       return _fs.isDirectory(tmpDir + '/unkown/').then(function(result){
            _assert.strictEqual(result, false);
        });
    });

    it('should return true in case a file is available', function(){
       return _fs.isDirectory(tmpDir).then(function(result){
            _assert.strictEqual(result, true);
        });
    });

    it('should return false in case the item is a file', function(){
       return _fs.isDirectory(_testfile).then(function(result){
            _assert.strictEqual(result, false);
        });
    });
    
});