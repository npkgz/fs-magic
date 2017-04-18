const _path = require('path');
const _fs = require('../fs-magic');

let p = 'effwe/effwef/efewfwfe';

console.log(_path.parse(p));

console.log(_path.resolve(p));

console.log(_path.parse(_path.resolve(p)));


console.log("\n\n------------------------------------");
_fs.mkdirp('my/simple/test/a/B/c', 0o750, true);