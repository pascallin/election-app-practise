const { describe, it } = require('mocha')
const { expect } = require('chai')
const utils = require('../src/lib/utils')

describe('jwt test', () => {
  it('get token string and verify', async () => {
    let token = utils.signToken({ email: 'pascal_lin@foxmail.com' })
    expect(token).to.be.a('string')
    let decode = utils.verifyToken(token)
    expect(decode).to.have.property('email')
    expect(decode.email).to.equal('pascal_lin@foxmail.com')
  })
})
