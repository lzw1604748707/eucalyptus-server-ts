import Router from 'koa-router'
import {ParameterizedContext, Context} from 'koa'
import {exec} from 'child_process'
const router = new Router()

router.post('/push', async (ctx, text) => {
  const rb = ctx.request.body
  exec('echo "' + JSON.stringify(rb) + '">> ./test.log')
  ctx.body = new Date().toDateString() + '  ' + '更新部署！'
})

router.get('/from', async (ctx: ParameterizedContext | Context) => {
  await ctx.render('from', {title: 'fafa'})
})

export default router
