const moment = require('moment')
const cache = require('../service/cache')
const config = require('config')
const _ = require('lodash')

module.exports = {
  vote: async (ctx) => {
    const { candidates } = ctx.request.body
    // check candidates length
    if (candidates.length < 2 || candidates.length > 4) {
      ctx.throw(406, 'You can only vote less than 5 candidate and more than 2 candidate', { code: CODE.VOTE_LIMIT })
    }
    // check vote record
    const count = await db.table('user_vote_record').where({
      user_id: ctx.state.user.id,
      election_id: config.get('electionId')
    }).first()
    if (count) {
      ctx.throw(406, 'You have been vote', { code: CODE.HAVE_BEEN_VOTE })
    }
    // check election time
    const election = await db.table('election').where('id', config.get('electionId')).first()
    if (!election) {
      ctx.throw(404, `Election not found by id: ${config.get('electionId')}`, { code: CODE.ELECTION_NOT_FOUND })
    }
    if (moment() < moment(election.start)) {
      ctx.throw(406, 'Election not start yet', { code: CODE.ELECTION_TIME_LIMIT })
    }
    if (moment() > moment(election.end)) {
      ctx.throw(406, 'Election has been end', { code: CODE.ELECTION_TIME_LIMIT })
    }
    // check candidates
    let candidatesRecords = await cache.getCandidates()
    candidatesRecords = candidatesRecords.map(v => v.id)
    let intersection = _.intersection(candidatesRecords, candidates)
    if (intersection.length !== candidates.length) {
      ctx.throw(406, 'Can not vote some candidates which are not exist', { code: CODE.CANDIDATE_NOT_EXIST })
    }
    // start vote
    try {
      await cache.vote(candidates)
      _saveVote({ electionId: config.get('electionId'), userId: ctx.state.user.id, candidates })
    } catch (e) {
      console.error(e.stack)
      ctx.throw(500, 'Can not vote now, please try again later.')
    }
    ctx.body = { data: { status: 1 } }
  },
  votes: async (ctx) => {
    const result = await cache.getCandidates()
    ctx.body = { data: result }
  }
}

function _saveVote (params) {
  const run = async ({ electionId, userId, candidates }) => {
    const trx = await db.getTransaction()
    try {
      await db.table('user_vote_record').transacting(trx).insert({
        user_id: userId,
        election_id: electionId,
        candidates: candidates.join(',')
      })
      for (let id of candidates) {
        await db.table('candidate').transacting(trx).where('id', id).increment('vote_count', 1)
      }
      await trx.commit()
    } catch (e) {
      await trx.rollback()
      console.error(e.stack)
      throw e
    }
  }
  run(params).then()
}
