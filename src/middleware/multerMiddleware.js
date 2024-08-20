const path = require('path')
const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'upload',)
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = String(Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png')
      req.imageIdentifier = uniqueSuffix
      cb(null, uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
  module.exports = upload