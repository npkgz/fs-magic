fs-magic
=========================

An extended, promisified **fs** drop-in-replacement for Node.js **>=7.6**

Features
------------------------------

* All asynchronous **fs** functions are proxied by **thenify-all** and converted into promises
* Lot of extended functions are added
* Targeted to use with modern Node.js version which supports `await` and `async function` nativly

Extensions
------------------------------

* **copy** Just copy a file (stream based)
* **bulkCopy** Copy directories with multiple files/directories in once
* **mkdirp** Create directories recursivly
* **exists** Custom `exists` function to test file existence
* **FileInputStream** Open a new fileReadStream
* **FileOutputStream** Write stream to destination file

General Usage
------------------------------

```js
const _fsm = require('fs-magic');

// wraper 
(async function(){
    // does the file exists ?
    console.log(await _fsm.exists('myfile.js'));

    // copy a file, set chmod to 0640
    await _fsm.copy('test1.js', 'test2.js', 0o640);

    // create directory stucture at once
    await _fsm.mkdirp('my/custom/dir/1/2/3', 0o777, true);

    // use fs methods
    await _fsm.rmdir('mydir');
})();
```

fs-magic::copy
---------------------------------

Description: Copy a single file

Syntax: `copy(sourcefile:string, destinationfile:string, mode:int=null)`

Example:

```js
    // copy a file, set chmod to 0640
    await _fsm.copy('test1.js', 'test2.js', 0o640);
```


fs-magic::bulkCopy
---------------------------------

Description: Copy multiple files at once

Syntax: `bulkCopy(srcset:Array, createDestinationDirs:boolean=true, defaultFilemode:int=0o750, defaultDirmode:int=0o777)`

Example:

```js
    // list of files to copy
    const srcset = [
        ['source/file1.js', 'destination/subdir/file1.js', 0o644],
        ['source/file2.js', 'destination/subdir/file2.js', 0o644],
        ['source/file3.js', 'destination/subdir/x/file3.js', 0o644],
        ['source/file4.js', 'destination/subdir/x/file4.js', 0o644],
    ];

    // copy files + create destination directories
    await _fsm.bulkCopy(srcset, true);

```

fs-magic::mkdirp
---------------------------------

Description: Create a directories recusivly

Syntax: `mkdirp(directory:string, mode:int=0o777, resursive:boolean=false)`

Example:

```js
    // create directory stucture at once
    await _fsm.mkdirp('my/custom/dir/1/2/3', 0o777, true);
```

fs-magic::exists
---------------------------------

Description: Check if a file/directory/link exists

Syntax: `exists(filedir:string)`

Example:

```js
    // does the file exists ?
    console.log(await _fsm.exists('myfile.js'));
```

fs-magic::FileInputStream
---------------------------------

Description: Open a fileStream for read

Syntax: `FileInputStream(sourcefile:string)`

Example:

```js
const _fOutoutStream = require('./FileOutputStream');
const _fInputStream = require('./FileInputStream');

// copy source file to destination (override it)
async function copy(src, dst, mode=null){
    // open file input stream
    const istream = await _fInputStream(src);

    // write stream content to file
    return _fOutoutStream(istream, dst, mode);
}
```

fs-magic::FileOutputStream
---------------------------------

Description: Writes given stream into file

Syntax: `FileOutputStream(readstream:stream, destinationFilename:string, mode:int=false)`

Example:

```js
const _fOutoutStream = require('./FileOutputStream');
const _fetch = require('node-fetch');

// fetch remote content
const response = _fetch('http://example.org/file.gz');

// write stream content to file
await _fOutoutStream(response.body, dst, mode);
```

Any Questions ? Report a Bug ? Enhancements ?
---------------------------------------------
Please open a new issue on [GitHub](https://github.com/AndiDittrich/Node.fs-magic/issues)

License
-------
fs-magic is OpenSource and licensed under the Terms of [The MIT License](LICENSE.md)