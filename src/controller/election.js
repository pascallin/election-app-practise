const moment = require('moment')
const config = require('config')

module.exports = {
  info: async (ctx) => {
    let record = await db.table('election').where('id', config.get('electionId')).first()
    record.start = moment(record.start).format('YYYY-MM-DD HH:mm:ss')
    record.end = moment(record.end).format('YYYY-MM-DD HH:mm:ss')
    ctx.body = { data: record }
  },
  manage: async (ctx) => {
    const { start, end } = ctx.request.body
    if (moment(end) < moment(start)) {
      ctx.throw(406, 'Election end time must later than start time', { code: CODE.ELECTION_TIME_LIMIT })
    }
    const result = await db.table('election').where('id', config.get('electionId')).update({
      start, end
    })
    ctx.body = { data: result }
  }
}
