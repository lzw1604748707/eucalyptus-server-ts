import Application from 'koa'
import {exec} from 'child_process'
import crypto from 'crypto'
import util from 'util'
import path from 'path'
class GithubSevice {
  /**
   * 本地执行自动部署
   */
  public async reAsignAutoDeploy(request: Application.Request) {
    try {
      await this.verifySignature(request)
      const {repository} = request.body
      const execPromise = util.promisify(exec)
      // 获取指定目录
      const filePath = path.join(process.cwd(), '..', repository.name, 'package.sh')
      if (repository.name === process.env['npm_package_name']) {
        // 设置执行权限
        exec('chmod -R u+x "' + filePath + '"')
        exec(filePath, (errror, stdout) => {
          console.log(stdout, '自动部署完成')
        })
        return Promise.resolve()
      } else {
        const execPromise = util.promisify(exec)
        await execPromise('chmod -R u+x "' + filePath + '"')
        return execPromise('"' + filePath + '"')
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * 验证签名信息
   */
  private verifySignature(request: Application.Request) {
    const errorMessageMap: Record<string, any> = {
      'x-hub-signature': '没有钩子签名哦~',
      'x-github-event': '你还没说你要用什么方法呢！',
      'x-github-delivery': '你也不给个身份吗！！'
    }

    for (const key in errorMessageMap) {
      if (!request.headers[key]) return Promise.reject(errorMessageMap[key])
    }

    const signature = Buffer.from(request.headers['x-hub-signature'])
    const localSignature = Buffer.from(
      `sha1=${crypto
        .createHmac('sha1', 'eucalyptus')
        .update(signature)
        .digest('hex')}`
    )
    if (
      signature.length !== localSignature.length ||
      !crypto.timingSafeEqual(signature, localSignature)
    )
      return Promise.reject('不能做坏事！')
  }
}

export default new GithubSevice()
