import Koa from 'koa'

//online middlewares
import logger from 'koa-logger'
import bodyparser from 'koa-bodyparser'
import staticPath from 'koa-static'
import views from 'koa-views'
import json from 'koa-json'
import routes from './routes'

//local middlewares
import errorInterceptor from './middlewares/errorInterceptor'

// base-config
import HttpServer from './base/httpServer'
import serverConfig from './config/server'
import CallApi, {ApiRequestConfig} from './base/callApi'
import apiConfig from './config/axios'

const app = new Koa()

// 显示控制台日志的中间件
app.use(logger())
// 用来解析post请求的中间件
app.use(bodyparser({enableTypes: ['json', 'form', 'text']}))
// 配置静态资源路径的中间件
app.use(staticPath(__dirname + '/public'))
// 非接口用来渲染视图的中间件
app.use(views(__dirname + '/views', {extension: 'pug'}))
// 美化显示json数据的中间件
app.use(json())

// routes
app.use(routes.routes()).use(routes.allowedMethods())

app.use(errorInterceptor)
// 监听服务
export const $httpServer = new HttpServer(app.callback(), serverConfig.port)
export const $callApi: ({
  api,
  method,
  param,
  config
}: ApiRequestConfig) => {} = new CallApi(apiConfig).callApi
