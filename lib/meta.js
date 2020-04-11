const path = require('path');

module.exports =function (name) {
return {
  prompts: {
    webpack: {
          when: 'ismeta',
          type: 'list',
          message: 'Which template you want?',
          choices:['React','React Component'],

        },
    name: {
      when: 'ismeta',
      type: 'input',
      message: 'your package name:',
      default:name
    },
    description: {
      when: 'ismeta',
      type: 'string',
      message: 'description:'
    },
    author: {
      when: 'ismeta',
      type: 'string',
      message: 'Author:'
    },

    eslint: {
      when: 'ismeta',
      type: 'confirm',
      message: 'Install Eslint+Prettier?',
    },
     redux: {
              when: 'ismeta',
              type: 'confirm',
              message: 'Install Redux?',
              },
     router: {
                when: 'ismeta',
                type: 'confirm',
                message: 'Install React-Router?',
              },
  },
    filters: {
        '.eslintrc.js': 'eslint',
        '.prettierrc': 'eslint',
         'config/**':"webpack==='React'",
        'index.html':"webpack==='React'",
        'src/router/**': 'router',
        'src/redux/**': 'redux',
        'src/pages/**': 'router',
        'src/pages/Test.js': 'redux',
        'src/App.js': '!router',
    },
}
};