const _mkdirp = require('./mkdirp');
const _copy = require('./copy');
const _path = require('path');

// copy a set of files simultanous
async function bulkCopy(srcset, createDestinationDirs=true, defaultFilemode=0o750, defaultDirmode=0o777){
    // create destination directories in advance ?
    if (createDestinationDirs === true){
        // get unique paths from filelist
        const dstDirs = Array.from(new Set(srcset.map((set) => _path.dirname(set[1]))));

        // create dirs
        for (let i=0;i<dstDirs.length;i++){
            await _mkdirp(dstDirs[i], defaultDirmode, true);
        };
    }

    // copy file parallel
    await Promise.all(srcset.map(function(set){
        return _copy(set[0], set[1], set[2] || defaultFilemode);
    }));
}

module.exports = bulkCopy;