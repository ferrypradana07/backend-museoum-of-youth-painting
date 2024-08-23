const express = require('express')

const { verifyUserToken, optionalVerifyToken } = require('../middleware/jwtMiddleware')
const { headerContentTypeJSON } = require('../middleware/headerMiddleware')
const userController = require('../controller/userController')
const profileController = require('../controller/profileController')
const router = express.Router()

router.post('/', verifyUserToken, headerContentTypeJSON, userController.updateUserData)
router.get('/:userId', optionalVerifyToken, profileController.getProfile)

module.exports = router