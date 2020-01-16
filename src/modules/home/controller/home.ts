import Router from 'koa-router'
import {Context, ParameterizedContext} from 'koa'

const router = new Router()

router.get('/', async (ctx: ParameterizedContext | Context, next) => {
  await ctx.render('index', {title: 'api文档首页！！！'})
})

router.get('/string', async (ctx, next) => {
  ctx.body = {a: 'aga'}
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

export default router
