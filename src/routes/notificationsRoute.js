const express = require('express')

const {verifyToken} = require('../middleware/jwtMiddleware')
const notificationController = require('../controller/notificationsController')
const router = express.Router()

router.get('/', verifyToken, notificationController.getNotifications)

module.exports = router