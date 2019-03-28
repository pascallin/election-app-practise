const moment = require('moment')
const config = require('config')

module.exports = (format) => {
  return async function (ctx, next) {
    const election = await db.table('election').where('id', config.get('electionId')).first()
    if (!election) {
      ctx.throw(404, 'Election not found', { code: CODE.ELECTION_NOT_FOUND })
    }
    if (moment() > moment(election.start)) {
      ctx.throw(406, 'Election has been start', { code: CODE.ELECTION_TIME_LIMIT })
    }
    ctx.state.election = election
    await next()
  }
}
