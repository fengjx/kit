const Cmd = require('../cmd')
const {Option} = require('commander')
const inquirer = require('inquirer')

class HelloCmd extends Cmd {

  actionName() {
    return 'hello'
  }

  description() {
    return 'hello world'
  }

  makeOptions() {
    return [
      new Option('-d, --debug', 'debug').default(false),
      new Option('-n, --name <type>', 'your name').makeOptionMandatory(true),
    ]
  }

  exec(opts) {
    if (opts.debug) {
      console.log('opts: ', opts)
    }
    console.log(`hello: ${opts.name}`)


    const choices = []
    choices.push('vue')
    choices.push('vuex')
    choices.push('axios')

    // https://github.com/SBoudrias/Inquirer.js/tree/master/packages/inquirer/examples
    // 交互式终端
    const questions = [
      {
        type: 'input',
        name: 'username',
        message: '输入账号',
      },
      {
        type: 'password',
        name: 'password',
        message: '输入密码'
      },
      {
        type: 'list',
        name: 'size',
        message: 'What size do you need?',
        choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
        filter(val) {
          return val.toLowerCase()
        },
      },
      {
        type: 'checkbox',
        name: 'deps',
        message: '安装依赖',
        choices,
      },
    ]

    inquirer.prompt(questions).then((answers) => {
      console.log(JSON.stringify(answers, null, '  '))
    })
  }

}


module.exports = HelloCmd
