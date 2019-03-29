const redis = require('../lib/redis')

/**
 * key:
 *  - candidates              (set)
 *  - candidate{id}:name      (string)
 *  - candidate{id}:votes     (string)
 */
module.exports = {
  load: async (electionId) => {
    // candidates cache set
    const candidates = await db.table('candidate').select('id', 'name', 'vote_count')
    if (candidates.length > 0) {
      await redis.sadd(`candidates`, candidates.map(v => v.id))
      // load candidates name and votes
      for (let candidate of candidates) {
        await redis.set(`candidate${candidate.id}:name`, candidate.name)
        await redis.set(`candidate${candidate.id}:votes`, candidate.vote_count)
      }
    }
  },
  vote: async (candidateIdList) => {
    // increment cache with transaction
    let command = redis.multi()
    for (let candidateId of candidateIdList) {
      const key = `candidate${candidateId}:votes`
      const cache = await redis.exists(key)
      if (cache) {
        await command.incr(key)
      } else {
        await command.set(key, 1)
      }
    }
    await command.exec()
  },
  getCandidates: async (electionId) => {
    // get candidates
    const candidates = await redis.smembers(`election${electionId}:candidates`)
    const result = []
    for (let id of candidates) {
      let name = await redis.get(`candidate${id}:name`)
      let votes = await redis.get(`candidate${id}:votes`)
      result.push({ id, name, votes })
    }
    return result
  },
  syncCandidates: async () => {
    // candidates cache set
    const candidates = await db.table('candidate').select('id', 'name', 'vote_count')
    await redis.sadd(`candidates`, candidates.map(v => v.id))
    // load candidates name and votes
    for (let candidate of candidates) {
      await redis.set(`candidate${candidate.id}:name`, candidate.name)
      await redis.set(`candidate${candidate.id}:votes`, candidate.vote_count)
    }
  }
}
