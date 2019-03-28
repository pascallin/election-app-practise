module.exports = function () {
  return async (ctx, next) => {
    try {
      await next()
      ctx.body.code = CODE.SUCCESS
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: err.code || CODE.COMMON_ERROR,
        message: err.message || 'Error occure, Please try again later.'
      }
    }
  }
}
