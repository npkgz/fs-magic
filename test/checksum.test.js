const _fs = require('../fs-magic');
const _path = require('path');
const _assert = require('assert');
let _refChecksums = require('./checksums.json');
const _testfile = _path.join(__dirname, 'random.bin');

// generic checksum testing
describe('checksum', function(){
 
    // directory within the fs test will executed
    let tmpDir = null;

    // create tmp dir
    before(async function(){
        // initialize tmp dir
       tmpDir = await _fs.mkdtemp('/tmp/test-');
    });

    it('should throw an exepction in case the file is not available (ENOENT)', function(){
        
       return _fs.checksum(tmpDir + '/unkownFile.txt', 'sha1').then(function(result){
            _assert.fail('An exception should be thrown');

        }).catch(function(e){
            _assert.equal(e.code, 'ENOENT');
        });
    });

    it('should calculate sha256sum (default) as hex (default)', function(){
        return _fs.checksum(_testfile).then(function(result){
            _assert.equal(result, _refChecksums.hex.sha256);
        });
    });

    it('should calculate md5sum as hex (default)', function(){
        return _fs.checksum(_testfile, 'md5').then(function(result){
            _assert.equal(result, _refChecksums.hex.md5);
        });
    });
    it('should calculate md5sum as hex (forced)', function(){
        return _fs.checksum(_testfile, 'md5', 'hex').then(function(result){
            _assert.equal(result, _refChecksums.hex.md5);
        });
    });
    it('should calculate sha1sum as hex', function(){
        return _fs.checksum(_testfile, 'sha1').then(function(result){
            _assert.equal(result, _refChecksums.hex.sha1);
        });
    });
    it('should calculate sha256sum as hex', function(){
        return _fs.checksum(_testfile, 'sha256').then(function(result){
            _assert.equal(result, _refChecksums.hex.sha256);
        });
    });
    it('should calculate sha384sum as hex', function(){
        return _fs.checksum(_testfile, 'sha384').then(function(result){
            _assert.equal(result, _refChecksums.hex.sha384);
        });
    });
    it('should calculate sha512sum as hex', function(){
        return _fs.checksum(_testfile, 'sha512').then(function(result){
            _assert.equal(result, _refChecksums.hex.sha512);
        });
    });

    it('should calculate md5sum as base64', function(){
        return _fs.checksum(_testfile, 'md5', 'base64').then(function(result){
            _assert.equal(result, _refChecksums.base64.md5);
        });
    });
    it('should calculate sha1sum as base64', function(){
        return _fs.checksum(_testfile, 'sha1', 'base64').then(function(result){
            _assert.equal(result, _refChecksums.base64.sha1);
        });
    });
    it('should calculate sha256sum as base64', function(){
        return _fs.checksum(_testfile, 'sha256', 'base64').then(function(result){
            _assert.equal(result, _refChecksums.base64.sha256);
        });
    });
    it('should calculate sha384sum as base64', function(){
        return _fs.checksum(_testfile, 'sha384', 'base64').then(function(result){
            _assert.equal(result, _refChecksums.base64.sha384);
        });
    });
    it('should calculate sha512sum as base64', function(){
        return _fs.checksum(_testfile, 'sha512', 'base64').then(function(result){
            _assert.equal(result, _refChecksums.base64.sha512);
        });
    });
    
    it('should calculate whirpool checksum as hex', function(){
        return _fs.checksum(_testfile, 'whirlpool', 'hex').then(function(result){
            _assert.equal(result, _refChecksums.hex.whirlpool);
        });
    });

    it('should calculate whirpool checksum as base64', function(){
        return _fs.checksum(_testfile, 'whirlpool', 'base64').then(function(result){
            _assert.equal(result, _refChecksums.base64.whirlpool);
        });
    });

});