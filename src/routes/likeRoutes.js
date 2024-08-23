const express = require('express')

const {verifyUserToken} = require('../middleware/jwtMiddleware')
const likeController = require('../controller/likeController')

const router = express.Router()

router.post('/:imageId', verifyUserToken, likeController.createLike)
router.delete('/:imageId', verifyUserToken, likeController.deleteLike)

module.exports = router