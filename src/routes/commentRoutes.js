const express = require('express')

const {verifyUserToken} = require('../middleware/jwtMiddleware')
const commentController = require('../controller/commentController')

const router = express.Router()

router.post('/:imageId', verifyUserToken, commentController.createComment)
router.delete('/:imageId/:commentId', verifyUserToken, commentController.deleteComment)

module.exports = router