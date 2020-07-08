import Application from 'koa'
import {exec} from 'child_process'
import crypto from 'crypto'
class GithubSevice {
  /**
   * 本地执行自动部署
   */
  public reAsignAutoDeploy(request: Application.Request) {
    // this.verifySignature(request)
    const {repository} = request.body
    exec('echo "' + repository.name + '"> ./data.log')
    exec('echo "' + JSON.stringify(repository) + '"> ./repository.log')
    exec('chmod -R u+x ../"' + repository.name + '"/package.sh')
    exec('../"' + repository.name + '"/package.sh')
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
      if (!request.headers[key]) throw Error(errorMessageMap[key])
    }

    const signature = Buffer.from(request.headers['x-hub-signature'])
    const localSignature = Buffer.from(
      `sha1=${crypto
        .createHmac('sha1', 'enculyptus')
        .update(signature)
        .digest('hex')}`
    )
    if (
      signature.length !== localSignature.length ||
      !crypto.timingSafeEqual(signature, localSignature)
    )
      throw new Error('不能做坏事！')
  }
}

export default new GithubSevice()
