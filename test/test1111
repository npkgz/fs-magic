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

    if (await _fsm.exists('motd')){
        console.log('Is Symlink', await _fsm.isSymlink('motd'));
        console.log('Is File', await _fsm.isFile('motd'));
    }

})();

