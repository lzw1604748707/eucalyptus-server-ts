import {Context, ParameterizedContext, Next} from 'koa'
export default async (ctx: ParameterizedContext | Context, next: Next) => {
  const statusCode = ctx.status
  await next()
  statusCode.toString().startsWith('4') &&
    (await ctx.render('error', {
      code: statusCode,
      message: '呜呜呜！！找不到家啦！！┭┮﹏┭┮'
    }))
  statusCode.toString().startsWith('5') &&
    (await ctx.render('error', {
      code: statusCode,
      message: '啊啊啊啊！！家里着火啦！！！(ΩДΩ)'
    }))
}
