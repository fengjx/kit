/**
 * 命令接口
 */
class Cmd {

  /**
   * 命令名称
   *
   * @returns string
   */
  actionName() {
  }

  /**
   * 命令描述
   */
  description() {
  }

  /**
   * 命令参数配置
   * @returns Option[]
   */
  makeOptions() {
  }

  /**
   * 业务逻辑
   * @param {*} opts
   */
  // eslint-disable-next-line no-unused-vars
  exec(opts) {
  }


}


module.exports = Cmd
