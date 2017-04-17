const _fsm = require('../fs-magic');
const _fetch = require('node-fetch');

// wraper 
(async function(){
    console.log(await _fsm.exists('../fs-magic.js'));

    console.log(await _fsm.copy('test1.js', 'test2.js'));

    console.log(await _fsm.mkdirp('my/custom/dir/1/2/3', 0o777, true));
    console.log('Is Directory', await _fsm.isDirectory('my/custom/dir/1/2/3'));

    console.log('Is File', await _fsm.isFile('test1.js'));

    console.log('Is Directory', await _fsm.isDirectory('my'));
    console.log('Is File', await _fsm.isFile('my'));

    console.log('Is Symlink', await _fsm.isSymlink('motd'));
    console.log('Is File', await _fsm.isFile('motd'));

    console.log('Tar.gz test');

    // fetch demo package
    let response = await _fetch('https://api.github.com/repos/AenonDynamics/linux-motd-sysinfo/tarball/v0.1.0');

    // unpack
    let items = await _fsm.untgz(response.body, '.');

    // list all unpacked items
    console.log(items);
})();

