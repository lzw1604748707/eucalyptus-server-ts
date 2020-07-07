import Application from 'koa'

class GithubSevice {
  /**
   * 本地执行自动部署
   */
  public reAsignAutoDeploy(request: Application.Request) {
    exec('echo "' + JSON.stringify(request) + '">> ./test.log')
  }

  /**
   * 验证签名信息
   */
  public verifySignature(request: Application.Request) {
    const signature = request.headers['x-hub-signature']
    const event = request.headers['x-github-event']
    const id = request.headers['x-github-delivery']

    // if (!signature) {
    //   return hasError('No X-Hub-Signature found on request')
    // }

    // if (!event) {
    //   return hasError('No X-Github-Event found on request')
    // }

    // if (!id) {
    //   return hasError('No X-Github-Delivery found on request')
    // }
  }
}

export default new GithubSevice()
