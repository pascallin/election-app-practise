const config = require('config').get('mysql')

const client = require('knex')({
  client: 'mysql',
  connection: config
})

client.getTransaction = () => {
  return new Promise((resolve, reject) => {
    client.transaction(trx => {
      resolve(trx)
    }).catch(reject)
  })
}

module.exports = client
