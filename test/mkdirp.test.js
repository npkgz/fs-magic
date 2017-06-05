const _fs = require('../fs-magic');
const _path = require('path');
const _assert = require('assert');
const _testfile = _path.join(__dirname, 'random.bin');

// recursive mkdir
describe('mkdirp', function(){
 
    // directory within the fs test will executed
    let tmpDir = null;

    // create tmp dir
    before(async function(){
        // initialize tmp dir
       tmpDir = await _fs.mkdtemp('/tmp/test-');
    });

    it('should fail is case the a item within existing path is not a directory (non recursive)', function(){
        return _fs.mkdirp(_path.join(__dirname, 'random.bin/xx/yy/zz')).then(function(result){
            _assert.fail('Should throw an exception');
        }).catch(function(e){
            _assert.equal(e.code, 'ENOTDIR');
        });
    });

    it('should fail is case the a item within existing path is not a directory (recursive)', function(){
        return _fs.mkdirp(_path.join(__dirname, 'random.bin/xx/yy/zz'), 0o777, true).then(function(result){
            _assert.fail('Should throw an exception');
        }).catch(function(e){
            _assert.ok('Failed as expected');
        });
    });

    it('should create multiple directories in once (recursive)', async function(){
        // create dir
        await _fs.mkdirp(_path.join(tmpDir, 'my/ultra_1/long1234/path/xx/yy/zz'), 0o777, true);

        // dir exists ?
        const result = await _fs.isDirectory(_path.join(tmpDir, 'my/ultra_1/long1234/path/xx/yy/zz'));

        _assert.strictEqual(result, true);
    });
    
});