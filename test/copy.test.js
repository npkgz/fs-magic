const _fs = require('../fs-magic');
const _path = require('path');
const _assert = require('assert');
let _refChecksums = require('./checksums.json');
const _testfile = _path.join(__dirname, 'random.bin');

// copy testing
describe('copy', function(){
 
    // directory within the fs test will executed
    let tmpDir = null;

    // create tmp dir
    before(async function(){
        // initialize tmp dir
       tmpDir = await _fs.mkdtemp('/tmp/test-');
    });

    it('should throw an exception in case the file is not available', function(){
        return _fs.copy(tmpDir + '/unkownFile.txt', tmpDir + '/myfile').then(function(result){
            _assert.fail('Should throw an exception!');
        }).catch(function(e){
            _assert.ok('Should Fail');
        })
    });

    it('should copy a file - content should match (compare checksum)', async function(){
        // copy file
        await _fs.copy(_testfile, tmpDir + '/testfile.bin');

        // get checksum
        const cs = await _fs.sha512file(tmpDir + '/testfile.bin');

        // equal ?
        _assert.equal(cs, _refChecksums.hex.sha512);
    });

    
});