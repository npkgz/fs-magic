const _path = require('path');
const _fs = require('./fs-promised');

// helper function to create directory only if they don't exists
async function mkdirp(dir, mode=0o777, resursive=false){
    let stats = null;
    // stats command executable ? dir/file exists
    try{
        stats = await _fs.stat(dir);

    }catch(e){}

    // dir already exists ?
    if (stats){
        // check if its a directory
        if (!stats.isDirectory()){
            throw Error('Requested directory <' + dir  + '> already exists and not of type directory');
        }

        // check mode
        if (stats.mode !== mode){
            await _fs.chmod(dir, mode);
        }

    // create it recursivly
    }else if (resursive){
        // absolute or relative path ? make it absolute
        if (dir.substring(0, 1) !== '/'){
            dir = process.cwd() + '/' + dir;
        }

        // filter path. drop leading/trailing slash; drop whitespaces
        dir = dir.replace(/^\s*\/(.*?)\/?\s*$/g, '$1');

        // split into parts
        const subdirs = dir.split('/');

        // minimum of 2 segements required - this function does not create directories within filesystem root
        if (subdirs.length < 2){
            throw Error('Recursive mkdir does not create directories within filesystem root!');
        }

        // build dir
        let dyndir = _path.join('/', subdirs.shift());

        // iterate over path
        while (subdirs.length > 0){

            // append part
            dyndir = _path.join(dyndir, subdirs.shift());

            // stats command executable ? dir/file exists
            let stats = null;
            try{
                stats = await _fs.stat(dyndir);
            }catch(e){}

            // dir already exists ?
            if (stats){
                // check if its a directory
                if (!stats.isDirectory()){
                    throw Error('Requested path <' + dyndir  + '> already exists and not of type directory');
                }
            
            // create directory
            }else{
                await _fs.mkdir(dyndir, mode);
            }
        }

    // just create top level
    }else{
        await _fs.mkdir(dir, mode);
    }
}

module.exports = mkdirp;