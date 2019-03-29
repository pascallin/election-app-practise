const nodemailer = require('nodemailer')
const config = require('config')
const _ = require('lodash')
const utils = require('./utils')

function getRegisterTemplate (email) {
  return {
    subject: 'Election App用户注册验证',
    html: `
      <h3>请复制下面链接用浏览器打开进行验证</h3>
      <p>
      <a>${config.get('domain')}:${config.get('port')}/user/validate?token=${utils.signToken({ email })}</a>
      </p>
    `
  }
}

module.exports = async (to) => {
  let transporter = nodemailer.createTransport(config.get('email'))
  let mailOptions = _.merge({
    from: '"Election App" <electionapp@163.com>', to
  }, getRegisterTemplate(to))
  const res = await transporter.sendMail(mailOptions)
  return res
}
