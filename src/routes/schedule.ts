import Router from 'koa-router'
import scheduleSevice from '../modules/schedule/service/scheduleService'
const router = new Router()
router.get('/bing_new_iamge', async (ctx, next) => {
  scheduleSevice.reFindBingNewDayImage()
})
