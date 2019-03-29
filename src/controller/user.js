const utils = require('../lib/utils')
const sendEmail = require('../lib/email')

module.exports = {
  register: async (ctx) => {
    const { email, password } = ctx.request.body
    const record = await db.table('user').where('email', email).first()
    if (record) ctx.throw(406, 'Email has been taken by other user.', { code: CODE.USER_HAS_EXIST })
    const salt = (Math.random(6) * 1e6).toFixed(0)
    const user = {
      email, password: utils.cryptPwd(password, salt), salt
    }
    const result = await db.table('user').insert(user)
    const res = await sendEmail(email)
    console.log(res)
    ctx.body = { data: result }
  },
  validate: async (ctx) => {
    const { token } = ctx.query
    let decode
    try {
      decode = utils.verifyToken(token)
    } catch (e) {
      ctx.throw(401, 'Invalid token!', { code: CODE.UNAYTHORIZED })
    }
    const result = await db.table('user').where('email', decode.email).update({
      is_valid: 1,
      updated_at: new Date()
    })
    ctx.body = { data: result }
  },
  login: async (ctx) => {
    const { email, password } = ctx.request.body
    const user = await db.table('user').where('email', email).first()
    if (!user) {
      ctx.throw(404, 'User not found', { code: CODE.USER_NOT_FOUND })
    }
    if (user.password !== utils.cryptPwd(password, user.salt)) {
      ctx.throw(406, 'Wrong password', { code: CODE.WRONG_PASS })
    }
    if (!user.is_valid) {
      ctx.throw(406, 'Please validate account in email first', { code: CODE.INVALIDATE })
    }
    ctx.body = { data: { token: utils.signToken({ email: user.email, id: user.id }) } }
  }
}
