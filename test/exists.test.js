const _fs = require('../fs-magic');
const _path = require('path');
const _assert = require('assert');
let _refChecksums = require('./checksums.json');
const _testfile = _path.join(__dirname, 'random.bin');

// exists testing
describe('exists', function(){
 
    // directory within the fs test will executed
    let tmpDir = null;

    // create tmp dir
    before(async function(){
        // initialize tmp dir
       tmpDir = await _fs.mkdtemp('/tmp/test-');
    });

    it('should return false in case the node is not available', function(){
       return _fs.exists(tmpDir + '/unkownFile.txt').then(function(result){
            _assert.equal(result, false);
        });
    });

    it('should return true in case a file is available', function(){
       return _fs.exists(_testfile).then(function(result){
            _assert.equal(result, true);
        });
    });

    it('should return true in case a directory is available', function(){
       return _fs.exists(_path.dirname(__dirname)).then(function(result){
            _assert.equal(result, true);
        });
    });
    
});