import Router from 'koa-router'
import {ParameterizedContext, Context} from 'koa'

import githubSevice from '../service/github'
const router = new Router()

router.post('/push', async (ctx: ParameterizedContext | Context, text) => {
  const request = ctx.request
  try {
    await githubSevice.reAsignAutoDeploy(request)
    ctx.body = new Date().toLocaleString() + '  ' + '更新部署'
  } catch (error) {
    console.log('外部错误', error)
    await ctx.render('error', {code: 400, message: error})
  }
})

export default router
