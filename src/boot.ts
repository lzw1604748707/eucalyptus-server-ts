// entry
import app from './app'
const debug = require('debug')('demo:server')
import http from 'http'
//
// 启动类
class Boot {
  private port: string | number | boolean = '' //启动端口
  private server: any = null //服务
  public initConfig() {
    this.port = this.normalizePort(process.env.PORT || '3000')
    // app.set('port', port);

    // Create HTTP server.
    this.server = http.createServer(app.callback())

    /**
     * Listen on provided port, on all network interfaces.
     */
    this.server.listen(this.port)
    this.server.on('error', this.onError.bind(this))
    // this敏感，外部绑定this解决
    this.server.on('listening', this.onListening.bind(this))
  }

  /**
   * Normalize a port into a number, string, or false.
   */
  private normalizePort(val: string | number): string | number | boolean {
    const port: number = parseInt('' + val, 10)
    let value: string | number | boolean = false
    isNaN(port) && (value = val) // named pipe
    port >= 0 && (value = port) // named number
    return value
  }

  /**
   * Event listener for HTTP server "error" event.
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
   * Event listener for HTTP server "listening" event.
   */
  private onListening() {
    const addr = this.server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    debug('Listening on ' + bind)
  }
}

const boot = new Boot()
boot.initConfig()
