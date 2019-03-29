const _ = require('lodash')
const cache = require('../service/cache')
const config = require('config')

module.exports = {
  getList: async (ctx) => {
    const res = await db.table('candidate')
    ctx.body = { data: res }
  },
  getInfo: async (ctx) => {
    const { id } = ctx.params
    const res = await db.table('candidate').where('id', id)
    ctx.body = { data: res }
  },
  add: async (ctx) => {
    const res = await db.table('candidate')
      .insert(_.merge(ctx.request.body, { election_id: config.get('electionId') }))
    await cache.syncCandidates()
    ctx.body = {
      data: { id: res[0] }
    }
  },
  update: async (ctx) => {
    const { id } = ctx.params
    const res = await db.table('candidate')
      .where('id', id)
      .update(_.merge(ctx.request.body, { updated_at: new Date() }))
    ctx.body = { data: { status: 1 } }
    if (!res) {
      ctx.body = { data: { status: 0 } }
    }
  },
  del: async (ctx) => {
    const { id } = ctx.params
    const res = await db.table('candidate').where('id', id).del()
    ctx.body = { data: { status: 1 } }
    if (!res) {
      ctx.body = { data: { status: 0 } }
    }
  }
}
