import Koa from 'koa'

import views from 'koa-views'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import staticPath from 'koa-static'

import moment from 'moment'

import routes from './routes'

moment.locale('zh-cn')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const onerror = require('koa-onerror')
export const app = new Koa()
// error handler
onerror(app)

// middlewares
app.use(bodyparser({enableTypes: ['json', 'form', 'text']}))
app.use(json())
app.use(logger())
app.use(staticPath(__dirname + '/public'))
app.use(views(__dirname + '/views', {extension: 'pug'}))

// logger
app.use(async (ctx, next) => {
  const start = +moment()
  await next()
  const ms = moment.duration(+moment() - start, 'ms')
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(routes.routes()).use(routes.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

export default app
