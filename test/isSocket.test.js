const _fs = require('../fs-magic');
const _path = require('path');
const _assert = require('assert');
const _net = require('net');
const _testfile = _path.join(__dirname, 'random.bin');

// socket type testing
describe('isSocket', function(){
 
    // directory within the fs test will executed
    let tmpDir = null;
    let socket = null;

    // create tmp dir
    before(async function(){
        // initialize tmp dir
       tmpDir = await _fs.mkdtemp('/tmp/test-');
    });

    // create server socket
    before(function(done){
        socket = _net.createServer();
        socket.listen('/tmp/mysocket.sock', done);
    });

    // close socket
    after(function(done){
        socket.close(done);
    });

    it('should return false in case the socket is not available', function(){
       return _fs.isSocket(tmpDir + '/unkownsocket').then(function(result){
            _assert.strictEqual(result, false);
        });
    });

    it('should return true in case a socket is available', function(){
       return _fs.isSocket('/tmp/mysocket.sock').then(function(result){
            _assert.strictEqual(result, true);
        });
    });

    it('should return false in case the item is a file', function(){
       return _fs.isSocket(_testfile).then(function(result){
            _assert.strictEqual(result, false);
        });
    });
    
});