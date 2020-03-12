import Router from 'koa-router'
import scheduleSevice from '../service/schedule'
const router = new Router()
router.get('/bing_new_iamge', async (ctx, next) => {
  scheduleSevice.reFindBingNewDayImage()
})

export default router
