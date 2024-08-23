const express = require('express')

const {signTokenUpdatePass, verifyTokenForUpdatePassword, verifyToken, verifyRegisterToken} = require('../middleware/jwtMiddleware')
const {headerContentTypeXURLEncoded} = require('../middleware/headerMiddleware')
const {sendMail} = require('../middleware/mailerMiddleware')
const userController = require('../controller/userController')

const router = express.Router()

router.post('/login', headerContentTypeXURLEncoded, userController.authorization)

router.post('/email-validation', headerContentTypeXURLEncoded, userController.emailValidation, sendMail)
router.post('/register', headerContentTypeXURLEncoded, verifyRegisterToken, userController.register)

router.post('/change-password', headerContentTypeXURLEncoded, verifyTokenForUpdatePassword, userController.updateUserPassword)
router.post('/request-password-reset', headerContentTypeXURLEncoded, signTokenUpdatePass, sendMail)

router.post('/validation-token', verifyToken)

module.exports = router