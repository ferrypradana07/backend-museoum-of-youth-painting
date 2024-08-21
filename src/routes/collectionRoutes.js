const express = require('express')

const {verifyToken} = require('../middleware/jwtMiddleware')
const collectionController = require('../controller/collectionController')

const router = express.Router()

router.post('/:imageId', verifyToken, collectionController.createCollection)
router.delete('/:imageId', verifyToken, collectionController.deleteCollection)
// success
module.exports = router