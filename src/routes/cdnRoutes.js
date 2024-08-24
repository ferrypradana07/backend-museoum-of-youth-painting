const express = require('express')
const path = require('path')
const fs = require('fs')

const router = express.Router()

router.get('/:identifier', (req, res) => {
    const { identifier }= req.params
    const imagesLocation = path.join(__dirname, '..', 'images', identifier)
    if (fs.existsSync(imagesLocation)) {
        res.sendFile(imagesLocation)
    } else {
        res.status(404).json({
            'error' : {
                "message" : 'Image not found'
            }
        })
    }
})

module.exports = router