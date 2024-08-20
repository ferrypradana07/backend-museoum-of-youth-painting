const express = require('express')

const {verifyToken} = require('../middleware/jwtMiddleware')
const followerController = require('../controller/followerController')
const router = express.Router()

router.post('/:userId', verifyToken, followerController.createfollower)
router.delete('/:userId', verifyToken, followerController.deletefollower)

module.exports = router