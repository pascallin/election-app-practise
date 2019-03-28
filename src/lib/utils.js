const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('config')
const _ = require('lodash')

module.exports = {
  cryptPwd (password, salt) {
    var saltPassword = password + ':' + salt
    var md5 = crypto.createHash('md5')
    var result = md5.update(saltPassword).digest('hex')
    return result
  },
  signToken (obj) {
    obj = _.merge({ timestamp: Date.now() }, obj)
    return jwt.sign(obj, config.get('secret'))
  },
  verifyToken (token) {
    return jwt.verify(token, config.get('secret'))
  }
}
