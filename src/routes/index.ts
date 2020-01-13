import Router from 'koa-router'
import {Context} from 'koa'

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = ctx
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
