const express = require('express')

const usersController = require('../controller/usersController')
const {gettingManyDatasValidation} = require('../middleware/requestMiddleware')

const router = express.Router()

router.get('/', gettingManyDatasValidation, usersController.getUsers)
// 
module.exports = router