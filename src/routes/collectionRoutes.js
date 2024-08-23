const express = require('express')

const {verifyUserToken} = require('../middleware/jwtMiddleware')
const collectionController = require('../controller/collectionController')

const router = express.Router()

router.post('/:imageId', verifyUserToken, collectionController.createCollection)
router.delete('/:imageId', verifyUserToken, collectionController.deleteCollection)
// success
module.exports = router