const async = require('async');
const inquirer = require('inquirer');

const promptMapping = {
  string: 'input',
  boolean: 'confirm'
}

/****to get the meta.js info to metalsmith data* ***/
module.exports = function ask (prompts, metadate, done) {
  async.eachSeries(Object.keys(prompts), (key, next) => {
    inquirer.prompt([{
      type: promptMapping[prompts[key].type] || prompts[key].type,
      name: key,
      message: prompts[key].message,
      choices: prompts[key].choices || [],
      default: prompts[key].default||null
    }]).then(answers => {
      if (typeof answers[key] === 'string') {
        metadate[key] = answers[key].replace(/"/g, '\\"')
      } else {
        metadate[key] = answers[key]
      }
      next()
    }).catch(done)
  }, done)
}