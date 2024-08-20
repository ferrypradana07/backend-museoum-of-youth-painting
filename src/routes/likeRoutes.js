const express = require('express')

const {verifyToken} = require('../middleware/jwtMiddleware')
const likeController = require('../controller/likeController')

const router = express.Router()

router.post('/:imageId', verifyToken, likeController.createLike)
router.delete('/:imageId', verifyToken, likeController.deleteLike)

module.exports = router