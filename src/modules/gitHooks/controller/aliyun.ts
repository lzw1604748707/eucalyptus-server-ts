import Router from 'koa-router'
import {ParameterizedContext, Context} from 'koa'
import {exec} from 'child_process'
const router = new Router()

router.post('/push', async (ctx, text) => {
  const rb = ctx.request.body
  exec('echo "' + JSON.stringify(rb) + '">> ./test.log')
  ctx.body = new Date().toDateString() + '  ' + '更新部署'
})

export default router
