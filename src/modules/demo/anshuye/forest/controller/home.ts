import Router from 'koa-router'
import {Context, ParameterizedContext} from 'koa'

const router = new Router()

router.get('/forest/home', async (ctx: ParameterizedContext | Context, next) => {
  ctx.body = {title: '子路由'}
})

export default router
