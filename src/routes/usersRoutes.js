const express = require('express')

const usersController = require('../controller/usersController')
const router = express.Router()

router.get('/', usersController.getUsers)

module.exports = router