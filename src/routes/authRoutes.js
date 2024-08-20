const express = require('express')

const {signTokenUpdatePass, verifyTokenForUpdatePassword} = require('../middleware/jwtMiddleware')
const {headerContentTypeJSON} = require('../middleware/headerMiddleware')
const {sendMail} = require('../middleware/mailerMiddleware')
const userController = require('../controller/userController')

const router = express.Router()

router.post('/login', headerContentTypeJSON, userController.authorization)
router.post('/register', headerContentTypeJSON, userController.register)

router.post('/change-password', headerContentTypeJSON, verifyTokenForUpdatePassword, userController.updateUserPassword)
router.post('/request-password-reset', headerContentTypeJSON, signTokenUpdatePass, sendMail)

module.exports = router