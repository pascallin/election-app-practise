const { describe, it } = require('mocha')
const { expect } = require('chai')
const sendEmail = require('../src/lib/email')

// describe('send email', () => {
//   it('get res', async () => {
//     let res = await sendEmail('pascal_lin@foxmail.com')
//     expect(res).to.have.property('accepted')
//     expect(res.accepted[0]).to.equal('pascal_lin@foxmail.com')
//   })
// })
