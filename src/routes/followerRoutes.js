const express = require('express')

const {verifyUserToken} = require('../middleware/jwtMiddleware')
const followerController = require('../controller/followerController')
const router = express.Router()

router.post('/:userId', verifyUserToken, followerController.createfollower)
router.delete('/:userId', verifyUserToken, followerController.deletefollower)

module.exports = router