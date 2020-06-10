import Router from 'koa-router'
import scheduleSevice from '../service/schedule'
const router = new Router()
router.get('/bing_new_iamge', async (ctx, next) => {
  ctx.body = await scheduleSevice.reFindAliyunGeoJson()
})

export default router
