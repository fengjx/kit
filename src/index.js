#!/usr/bin/env node

const {Command} = require('commander')
const HelloCmd = require('./cmd/hello')
const GitlabBatchClone = require('./cmd/gitlab/batch-clone')

// global.rootRequire = function (name) {
//   return require(__dirname + '/' + name)
// }
//
// global._ = __dirname + '/'

const cmds = [
  new HelloCmd(),
  new GitlabBatchClone()
]

const program = new Command('kit')
program.version('1.0.0')

cmds.forEach(item => {
  const action = new Command(item.actionName())
  action.description(item.description())
  const options = item.makeOptions()
  if (options) {
    options.forEach(opt => {
      action.addOption(opt)
    })
  }
  action.action(function () {
    console.log(this.opts())
    item.exec(this.opts())
  })

  program.addCommand(action)
})

program.parse(process.argv)

