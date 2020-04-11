const match = require('minimatch')
const evaluate = require('./eval');
const rm = require('rimraf').sync;
const path = require('path');
/**
 * files --all of the files in template
 * filters -- filters property in meta.js
 * data metalsmith.metadata()
 * done  --next handle plugin
 */
module.exports = (files, filters, data, done,name) => {
    if (!filters) {
        return done()
    }
    //get all of the key name
    const fileNames = Object.keys(files)
    Object.keys(filters).forEach(glob => {
        fileNames.forEach(file => {
            //if files not matched to metalsmith'data delete
            if (match(file, glob, { dot: true })) {
                const condition = filters[glob]
                if (!evaluate(condition, data)) {
                    rm(path.join(process.cwd(),name,glob)); //delete file if not match success
                    delete files[file]
                }
            }
        })
    })
    done()
}