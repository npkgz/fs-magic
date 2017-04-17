const _fsm = require('../fs-magic');

// wraper 
(async function(){
    console.log(await _fsm.exists('../fs-magic.js'));

    console.log(await _fsm.copy('test1.js', 'test2.js'));

    console.log(await _fsm.mkdirp('my/custom/dir/1/2/3', 0o777, true));
})();

