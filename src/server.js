const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const app = new Koa()

// load middleware
app.use(bodyParser())
app.use(require('./middleware/error')())
app.use(require('./middleware/logger')())

// load routes
const router = require('./router')
app.use(router.routes()).use(router.allowedMethods())

module.exports = app
