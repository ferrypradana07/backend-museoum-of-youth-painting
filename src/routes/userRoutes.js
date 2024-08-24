const express = require('express')

const { verifyUserToken, optionalVerifyToken } = require('../middleware/jwtMiddleware')
const { headerContentTypeMultipartFormData } = require('../middleware/headerMiddleware')
const userController = require('../controller/userController')
const profileController = require('../controller/profileController')
const upload = require('../middleware/multerMiddleware')

const router = express.Router()

router.post('/update', verifyUserToken, headerContentTypeMultipartFormData, upload.single('profile_image'), userController.updateUser)
router.get('/:userId', optionalVerifyToken, profileController.getProfile)
router.delete('/:userId', verifyUserToken, userController.deleteUser)

module.exports = router