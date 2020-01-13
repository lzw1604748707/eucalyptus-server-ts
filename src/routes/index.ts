import Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx, next) => {
  await console.log('首页请求哈哈')
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

export default router
