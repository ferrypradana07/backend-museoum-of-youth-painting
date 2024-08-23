const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const limit = 1024 * 1024 * 5
        if (file.size > limit) {
          cb("File size more than 5MB")
        }
        const uploadDir = path.join(__dirname, '..' ,'uploads',)
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