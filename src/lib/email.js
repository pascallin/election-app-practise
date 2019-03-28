const nodemailer = require('nodemailer')
const config = require('config')
const _ = require('lodash')
const utils = require('./utils')

function getRegisterTemplate (email) {
  return {
    subject: 'Election App user register validate',
    html: `<h3>Please Click the link to finish register.</h3><p><a>http://${config.get('domain')}:${config.get('port')}/user/validate?token=${utils.signToken({ email })}</a></p>` // add token
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
