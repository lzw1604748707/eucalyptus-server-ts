import http from 'http'
import https from 'https'
export default class HttpServer {
  private server: any = null

  private port: string | number | boolean = 0

  public constructor(
    request: http.RequestListener | undefined,
    port: string | number | boolean = '3000',
    protocol: string = 'http'
  ) {
    this.server =
      protocol === 'http'
        ? http.createServer(request).listen(port)
        : https.createServer(request).listen(port)
    this.server.on('error', this.onError.bind(this))
    this.server.on('listening', this.onListening.bind(this))
  }

  /**
   * 服务器级别 错误日志
   * @param error 错误信息
   */
  private onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
      throw error
    }
    const bind = (typeof this.port === 'string' ? 'Pipe ' : 'Port ') + this.port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }

  /**
   * 服务器级别 监听日志
   */
  private onListening() {
    const addr = this.server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log('Listening on ' + bind)
  }
}
