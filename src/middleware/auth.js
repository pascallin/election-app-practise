const utils = require('../lib/utils')
const config = require('config')

module.exports.user = function () {
  return async (ctx, next) => {
    let token = ctx.request.header['x-api-key']
    if (!token) {
      return ctx.throw(401, 'Need login!', { code: CODE.UNAYTHORIZED })
    }
    let decode
    try {
      decode = utils.verifyToken(token)
    } catch (e) {
      return ctx.throw(401, 'Invalid token!', { code: CODE.UNAYTHORIZED })
    }

    ctx.state.user = decode

    await next()
  }
}

module.exports.operator = function () {
  return async (ctx, next) => {
    let token = ctx.request.header['fake-token']
    if (!token) {
      return ctx.throw(401, 'Missing fake token!', { code: CODE.UNAYTHORIZED })
    }
    if (token !== config.get('fakeToken')) {
      return ctx.throw(401, 'Invalid fake token!', { code: CODE.UNAYTHORIZED })
    }
    await next()
  }
}
