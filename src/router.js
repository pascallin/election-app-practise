const Router = require('koa-router')
const Joi = require('joi')
const validate = require('./middleware/validate')
const { user, operator } = require('./middleware/auth')
const checkElection = require('./middleware/checkElection')
let router = new Router()

// election
const electionController = require('./controller/election')
router.get('/election', electionController.info)
router.put('/election', operator(), validate({
  start: Joi.string().required(),
  end: Joi.string().required()
}), electionController.manage)

// vote
const voteController = require('./controller/vote')
router.post('/election/vote', user(), validate({
  candidates: Joi.array().items(Joi.number()) // limit candidates vote count
}), voteController.vote)
router.get('/election/votes', operator(), voteController.votes)

// candidate
const candidateController = require('./controller/candidate')
router.get('/candidate', candidateController.getList)
router.get('/candidate/:id', candidateController.getInfo)
router.post('/candidate', operator(), checkElection(), validate({
  name: Joi.string().required(),
  description: Joi.string()
}), candidateController.add)
router.put('/candidate/:id', operator(), checkElection(), validate({
  name: Joi.string(),
  description: Joi.string()
}), candidateController.update)
router.delete('/candidate/:id', operator(), checkElection(), candidateController.del)

// user
const userController = require('./controller/user')
router.post('/user/register', validate({
  email: Joi.string().email().required(),
  password: Joi.string().required()
}), userController.register)
router.get('/user/validate', userController.validate)
router.post('/user/login', userController.login)

module.exports = router
