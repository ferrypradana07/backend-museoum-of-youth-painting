
exports.headerContentTypeJSON = async (req, res, next) => {
    try {
        console.log('===============')
        const contentTypeHeader = req.headers['content-type']??''
        console.log(contentTypeHeader)
        console.log(req.headers)
        if (!contentTypeHeader) {
            return res.status(400).json({
                'error' : {
                    'message' : 'header Content-Type is required'
                }
            })
        }
        if (contentTypeHeader != 'application/json' || !contentTypeHeader.includes('json')) {
            return res.status(400).json({
                'error' : {
                    'message' : 'header Content-Type is required'
                }
            })
        }
        return next()
        
    } catch (error) {
        console.error('Error while validation header', error)
        res.status(400).json({
            'error' : {
                'message' : 'something going error'
            }
        })
    }
}

exports.headerContentTypeFormData = async (req, res, next) => {
    try {
        const contentTypeHeader = req.headers['content-type']??''
        console.log(contentTypeHeader)
        if (!contentTypeHeader) {
            return res.status(400).json({
                'error' : {
                    'message' : 'header Content-Type is required'
                }
            })
        }
        if (contentTypeHeader != 'multipart/form-data' || !contentTypeHeader.includes('form')) {
            return res.status(400).json({
                'error' : {
                    'message' : 'header Content-Type is required'
                }
            })
        }
        return next()
        
    } catch (error) {
        console.error('Error while validation header', error)
        res.status(400).json({
            'error' : {
                'message' : 'something going error'
            }
        })
    }
}