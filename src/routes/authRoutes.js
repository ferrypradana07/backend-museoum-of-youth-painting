const express = require('express')

const {signTokenUpdatePass, verifyTokenForUpdatePassword} = require('../middleware/jwtMiddleware')
const {headerContentTypeXURLEncoded} = require('../middleware/headerMiddleware')
const {sendMail} = require('../middleware/mailerMiddleware')
const userController = require('../controller/userController')

const router = express.Router()

router.post('/login', headerContentTypeXURLEncoded, userController.authorization)
router.post('/register', headerContentTypeXURLEncoded, userController.register)

router.post('/change-password', headerContentTypeXURLEncoded, verifyTokenForUpdatePassword, userController.updateUserPassword)
router.post('/request-password-reset', headerContentTypeXURLEncoded, signTokenUpdatePass, sendMail)

module.exports = router