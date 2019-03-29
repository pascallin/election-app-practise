const { describe, it } = require('mocha')
const { expect } = require('chai')
const utils = require('../src/lib/utils')
const request = require('supertest')
const code = require('../src/lib/code')

describe('user test', () => {
  it('register and validate', async () => {
    this.setTimeout(5000)
    let res = await request('http://localhost:3000')
      .post('/user/register')
      .send({ email: 'pascal_lin@foxmail.com', password: '123456' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body).to.have.property('code')
    if (res.body.code === code.SUCCESS) {
      let token = utils.signToken({ email: 'pascal_lin@foxmail.com' })
      expect(token).to.be.a('string')
      res = await request('http://localhost:3000')
        .get('/user/validate?token=' + token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(res.body).to.have.property('data')
    }
  })
  it('login', async () => {
    let res = await request('http://localhost:3000')
      .post('/user/login')
      .send({ email: 'pascal_lin@foxmail.com', password: '123456' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body).to.have.property('code')
    if (res.body.code === code.SUCCESS) {
      expect(res.body).to.have.property('data')
      expect(res.body.data).to.have.property('token')
      expect(res.body.data.token).to.be.a('string')
    }
  })
})
