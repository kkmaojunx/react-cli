const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const path = require('path');
const metaConfig = require('./options');
const ask = require('./ask');
const filter = require('./filter');

//main function to use handlebars packages
function generate(name, cb) {
    const metalsmith = Metalsmith(path.join(process.cwd(), name));
    metalsmith
        .use(askQuestions(metaConfig(name).prompts))
        .use(filterFiles(metaConfig(name).filters,name))
        .use(renderTemplateFiles());
         metalsmith.clean(false)
        .source('.')
        .destination(path.join(process.cwd(), name))  // determine which directory to output
        .build((err, files) => {
            cb && cb(err,metalsmith.metadata())
        })
}

function askQuestions(prompts) {
    return (fils, ms, done) => {
        ask(prompts, ms.metadata(), done)
    }
}


function filterFiles(filters,name) {
    return (files, metalsmith, done) => {
        filter(files, filters, metalsmith.metadata(), done,name)
    }

}

function renderTemplateFiles() {
    registerHelps()
    return (files, ms, done) => {
        const keys = Object.keys(files)
        keys.forEach(key => {
            if ((key.indexOf('static') === -1)) {  //because handlebar cannot solve static file
                const str = files[key].contents.toString()
                let t = Handlebars.compile(str)
                let html = t(ms.metadata())
                files[key].contents = new Buffer.from(html)  // execute render
            }
        });
        done()
    }
}

/** register a help to handlebars **/
function registerHelps() {
    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        if (a == b) // Or === depending on your needs
            return opts.fn(this);
        else
            return opts.inverse(this);
    });
}

module.exports = generate