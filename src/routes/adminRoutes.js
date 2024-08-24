const express = require('express')

const { verifyAdminToken } = require('../middleware/jwtMiddleware')
const adminController = require('../controller/adminController')

const router = express.Router()

router.delete('/user/:userId', verifyAdminToken, adminController.deleteUser)
router.delete('/image/:imageId', verifyAdminToken, adminController.deleteImage)
router.delete('/comment/:commentId', verifyAdminToken, adminController.deleteComment)

module.exports = router