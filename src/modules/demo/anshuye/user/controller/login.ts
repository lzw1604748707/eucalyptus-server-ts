import Router from 'koa-router'
import {Context, ParameterizedContext} from 'koa'

const router = new Router()

router.prefix('/forest')

router.get('/user', async (ctx: ParameterizedContext | Context, next) => {
  ctx.body = {a: '用户子路由'}
})

export default router
