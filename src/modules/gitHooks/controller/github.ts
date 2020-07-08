import Router from 'koa-router'
import {ParameterizedContext, Context} from 'koa'

import githubSevice from '../service/github'
const router = new Router()

router.post('/push', async (ctx: ParameterizedContext | Context, text) => {
  const request = ctx.request
  try {
    githubSevice.reAsignAutoDeploy(request)
    ctx.body = new Date().toLocaleString() + '  ' + '更新部署'
  } catch (error) {
    await ctx.render('error', error)
  }
})

export default router
