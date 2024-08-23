const express = require('express')

const {verifyUserToken} = require('../middleware/jwtMiddleware')
const notificationController = require('../controller/notificationsController')
const {gettingManyDatasValidation} = require('../middleware/requestMiddleware')

const router = express.Router()

router.get('/', gettingManyDatasValidation, verifyUserToken, notificationController.getNotifications)

module.exports = router