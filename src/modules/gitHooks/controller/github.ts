import Router from 'koa-router'
import {ParameterizedContext, Context} from 'koa'
import {exec} from 'child_process'

import githubSevice from '../service/github'
const router = new Router()

router.post('/push', async (ctx: ParameterizedContext | Context, text) => {
  const request = ctx.request

  githubSevice.reAsignAutoDeploy(request)

  ctx.body = new Date().toDateString() + '  ' + '更新部署'
})

export default router
