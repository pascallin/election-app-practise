const config = require('config')
const server = require('./server')
const cache = require('./service/cache')

async function main () {
  await init()
  // server start
  server.listen(config.get('port'))
  console.log(`app listening on ${config.get('port')}`)
}

main().catch(e => {
  process.exit(1)
})

async function init () {
  // load response code
  global.CODE = require('./lib/code')
  // load db
  global.db = require('./lib/knex')
  // load election
  const record = await global.db.table('election').first()
  if (!record) {
    await global.db.table('election').insert({
      name: 'Election App Test',
      start: '2019-04-02 00:00:00',
      end: '2019-04-05 00:00:00'
    })
  }
  // load cache
  await cache.load()
}
