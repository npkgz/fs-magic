const _fs = require('../fs-magic');
const _path = require('path');
const _assert = require('assert');
let _refChecksums = require('./checksums.json');
const _testfile = _path.join(__dirname, 'random.bin');

// checksum testing
describe('sha256sum', function(){
 
    // directory within the fs test will executed
    let tmpDir = null;

    // create tmp dir
    before(async function(){
        // initialize tmp dir
       tmpDir = await _fs.mkdtemp('/tmp/test-');
    });

    it('should throw an exepction in case the file is not available (ENOENT)', function(){
        
       return _fs.sha256file(tmpDir + '/unkownFile.txt').then(function(result){
            _assert.fail('An exception should be thrown');

        }).catch(function(e){
            _assert.equal(e.code, 'ENOENT');
        });
    });

    it('should calculate sha256sum as hex case the output format is unknown', function(){
        
        return _fs.sha256file(_testfile, 'unknownformat').then(function(result){
            _assert.equal(result, _refChecksums.hex.sha256);
        });
    });

    it('should calculate sha256sum as hex (default)', function(){
        return _fs.sha256file(_testfile).then(function(result){
            _assert.equal(result, _refChecksums.hex.sha256);
        });
    });
    
    it('should calculate sha256sum as base64 (forced)', function(){
        return _fs.sha256file(_testfile, 'base64').then(function(result){
            _assert.equal(result, _refChecksums.base64.sha256);
        });
    });
});