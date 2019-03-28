const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const request = require('supertest')
const config = require('config')
const code = require('../src/lib/code')
const moment = require('moment')

describe('candidate api', () => {
  describe('get /candidate', () => {
    it('respond with json', (done) => {
      request('http://localhost:3000')
        .get('/candidate')
        .set('Accept', 'application/json')
        .set('fake-token', config.get('fakeToken'))
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.a('array')
          done()
        })
    })
  })
  describe('post /candidate', () => {
    it('respond with json', async () => {
      const res = await request('http://localhost:3000')
        .post('/candidate')
        .send({ name: 'john', description: 'john is a good man.' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(res.body).to.have.property('code')
      expect(res.body.code).to.equal(code.UNAYTHORIZED)
    })
  })
  describe('after add one', () => {
    let id, election
    before(async () => {
      let res = await request('http://localhost:3000')
        .post('/election')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(res.body).to.have.property('code')
      expect(res.body.code).to.equal(code.SUCCESS)
      expect(res.body).to.have.property('data')
      election = res.body.data
      if (moment() < moment(election.start)) {
        res = await request('http://localhost:3000')
          .post('/candidate')
          .send({ name: 'john', description: 'john is a good man.' })
          .set('fake-token', config.get('fakeToken'))
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
        expect(res.body).to.have.property('code')
        expect(res.body.code).to.equal(code.SUCCESS)
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.have.property('id')
        id = res.body.data.id
      } else {
        res = await request('http://localhost:3000')
          .post('/candidate')
          .send({ name: 'john', description: 'john is a good man.' })
          .set('fake-token', config.get('fakeToken'))
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
        expect(res.body).to.have.property('code')
        expect(res.body.code).to.equal(code.ELECTION_TIME_LIMIT)
      }
    })
    if (id) {
      describe('get /candidate/:id', () => {
        it('respond with json', async () => {
          const res = await request('http://localhost:3000')
            .get('/candidate/' + id)
            .set('Accept', 'application/json')
            .set('fake-token', config.get('fakeToken'))
            .expect('Content-Type', /json/)
            .expect(200)
          expect(res.body).to.have.property('code')
          expect(res.body.code).to.equal(code.SUCCESS)
        })
      })
      describe('put /candidate/:id', () => {
        it('respond with json', async () => {
          const res = await request('http://localhost:3000')
            .put('/candidate/' + id)
            .send({ name: 'pascal', description: 'pascal test' })
            .set('Accept', 'application/json')
            .set('fake-token', config.get('fakeToken'))
            .expect('Content-Type', /json/)
            .expect(200)
          expect(res.body).to.have.property('code')
          expect(res.body.code).to.equal(code.SUCCESS)
        })
      })
      describe('delete /candidate/:id', () => {
        it('respond with json', async () => {
          const res = await request('http://localhost:3000')
            .delete('/candidate/' + id)
            .set('Accept', 'application/json')
            .set('fake-token', config.get('fakeToken'))
            .expect('Content-Type', /json/)
            .expect(200)
          expect(res.body).to.have.property('code')
          expect(res.body.code).to.equal(code.SUCCESS)
        })
      })
    }
  })
})
