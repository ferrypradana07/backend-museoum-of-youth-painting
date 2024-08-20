const express = require('express')
 
const imagesController = require('../controller/imagesController')
const router = express.Router() 


router.get('/', imagesController.getImages)
router.get('/:userId', imagesController.getUserImages)

module.exports = router