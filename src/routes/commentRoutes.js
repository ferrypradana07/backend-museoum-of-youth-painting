const express = require('express')

const {verifyToken} = require('../middleware/jwtMiddleware')
const commentController = require('../controller/commentController')

const router = express.Router()

router.post('/:imageId', verifyToken, commentController.createComment)
router.delete('/:imageId/:commentId', verifyToken, commentController.deleteComment)

module.exports = router