const Joi = require('joi')

module.exports = function (schema) {
  return async function (ctx, next) {
    let options = {
      stripUnknown: true
    }
    if (schema) {
      try {
        // POST & PUT
        if (schema && ['POST', 'PUT'].indexOf(ctx.method) > -1) {
          ctx.request.body = await validatePromise(
            ctx.request.body, schema, options)
        }
        // GET & DELETE
        if (schema && ['GET', 'DELETE'].indexOf(ctx.method) > -1) {
          ctx.request.query = await validatePromise(
            ctx.request.query, schema, options)
        }
      } catch (e) {
        ctx.throw(406, e.message, { code: CODE.PARAMS_ERROR })
      }
    }
    await next()
  }
}

function validatePromise (value, schema, options) {
  return new Promise((resolve, reject) => {
    Joi.validate(value, schema, options, (err, value) => {
      if (err) return reject(err)
      resolve(value)
    })
  })
}
