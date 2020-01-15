import Router from 'koa-router'

import {fileManageUtils} from 'eucalyptus-utils'
const router = new Router()
fileManageUtils.loadMultipleModule(__dirname + '/').then(moduleList => {
  moduleList.forEach(moduleMap => {
    const {module, name} = moduleMap
    name === 'index' ||
      router.use(module.default.routes()).use(module.default.allowedMethods())
  })
})
export default router
