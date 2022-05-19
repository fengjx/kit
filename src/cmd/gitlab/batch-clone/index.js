const Cmd = require('../../cmd')
const fileUtils = require('../../../utils/fileUtils')
const path = require('path')
const {axios} = require('../../../utils/http')
const shell = require('shelljs')
const {Option} = require('commander')

class GitlabBatchClone extends Cmd {

  actionName() {
    return 'gl-bcl'
  }

  description() {
    return 'gitlab 从项目组批量 clone'
  }

  makeOptions() {
    return [
      new Option('-h, --host <string>', 'gitlab host').makeOptionMandatory(true),
      new Option('-t, --token <string>', 'your token，see: /profile/personal_access_tokens').makeOptionMandatory(true),
      new Option('-g, --group <string>', 'target group').makeOptionMandatory(true),
      new Option('-p, --path <string>', 'target clone file path').makeOptionMandatory(false),
    ]
  }

  async exec(opts) {
    const host = opts.host
    const token = opts.token
    const group = opts.group
    const targetPath = opts.path || group

    const http = axios.create({
      headers: {
        'PRIVATE-TOKEN': token
      }
    })

    const groupProjectApi = (host, group) => {
      return `http://${host}/api/v4/groups/${group}/projects?simple=true&per_page=100`
    }

    const cloneByGroup = () => {
      http.get(groupProjectApi(host, group))
        .then(res => {
          console.log(`repo total: ${res.data.length}`)
          res.data.forEach(item => {
            const targetDir = path.join(targetPath, item.path)
            const cmd = `git clone ${item.ssh_url_to_repo} ${targetDir}`
            if (fileUtils.isExists(targetDir)) {
              console.log(`dir exists: ${targetDir}`)
              return
            }
            console.log(`clone project: ${item.name}`)
            if (shell.exec(cmd).code !== 0) {
              shell.echo('Error: git clone failed', cmd)
            }
          })
        }).catch(e => console.error('gitlab api request error', e))
        .finally(() => console.log('done'))
    }
    await cloneByGroup()
  }
}

module.exports = GitlabBatchClone
