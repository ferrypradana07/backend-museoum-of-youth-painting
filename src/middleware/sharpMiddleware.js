const sharp = require('sharp')
const path = require('path')

exports.compressFile = async (req, res, next) => {
    try {
        const filename = req.imageIdentifier
        const inputFile = path.join(__dirname, '..', 'uploads', filename)
        const outputFile = path.join(__dirname, '..', 'images', filename)
        let error; 

        sharp(inputFile).resize(400, 400).toFile(outputFile, (err, info) => {
            if (err) {
                console.error('Error while processing image', err)
                error = true
            } else {
                console.log('Image compress succesfully' + info)
            }
        })
        if (error) {
            return res.status(500).json({
                'error' : {
                    'message' : 'something going wrong'
                }
            })
        }
        return next()
    } catch (error) {
        console.log('Error while compressing file in middleware')
        res.status(500).json({
            'error' : {
                'message' : 'something going error'
            }
        })
    }
}