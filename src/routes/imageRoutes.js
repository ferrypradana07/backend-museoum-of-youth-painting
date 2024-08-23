const express = require('express')

const { optionalVerifyToken, verifyUserToken } = require('../middleware/jwtMiddleware')
const { headerContentTypeMultipartFormData } = require('../middleware/headerMiddleware')
const { compressFile } = require('../middleware/sharpMiddleware')

const imageController = require('../controller/imageController')
const contentController = require('../controller/contentController')
const router = express.Router()
const upload = require('../middleware/multerMiddleware')

router.delete('/:imageId', verifyUserToken, imageController.createImage)
router.get('/:imageId', optionalVerifyToken, contentController.getImageDetail)

router.post('/upload', verifyUserToken, headerContentTypeMultipartFormData, upload.single('image'), compressFile, imageController.createImage)

module.exports = router