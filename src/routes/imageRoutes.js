const express = require('express')

const { verifyToken, optionalVerifyToken } = require('../middleware/jwtMiddleware')
const { headerContentTypeJSON } = require('../middleware/headerMiddleware')

const imageController = require('../controller/imageController')
const contentController = require('../controller/contentController')
const router = express.Router()
const upload = require('../middleware/multerMiddleware')

router.delete('/:imageId', verifyToken, imageController.createImage)
router.get('/:imageId', optionalVerifyToken, contentController.getImageDetail)
router.post('/upload', verifyToken, headerContentTypeJSON, upload.single('image'), imageController.createImage)

module.exports = router