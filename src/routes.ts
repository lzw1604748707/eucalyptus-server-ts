import Router from 'koa-router'

import {fileManageUtils} from 'eucalyptus-utils'
const router = new Router()
const modulePath = __dirname + '/modules/'
const specifiedFolder = 'controller'
fileManageUtils.loadMultipleModule(modulePath, specifiedFolder).then(moduleList => {
  moduleList.forEach(moduleMap => {
    const {module, name} = moduleMap
    name === 'index' ||
      router.use(module.default.routes()).use(module.default.allowedMethods())
  })
})
export default router
