exports.headerContentTypeJSON = async (req, res, next) => {
    try {
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
        if (!contentTypeHeader.includes('application/json')) {
            return res.status(400).json({
                'error' : {
                    'message' : 'header Content-Type is invalid'
                }
            })
        }
        return next()
        
    } catch (error) {
        console.error('Error while validation header APPLICATION/JSON', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going error'
            }
        })
    }
}
// application/form-data
// application/x-www-form-urlencoded
exports.headerContentTypeMultipartFormData = async (req, res, next) => {
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
        if (!contentTypeHeader.includes('multipart/form-data')) {
            return res.status(400).json({
                'error' : {
                    'message' : 'header Content-Type is invalid'
                }
            })
        }
        return next()
        
    } catch (error) {
        console.error('Error while validation header MULTIPART/FROM-DATA', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going error'
            }
        })
    }
}
exports.headerContentTypeXURLEncoded = async (req, res, next) => {
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
        if (!contentTypeHeader.includes('x-www-form-urlencoded')) {
            return res.status(400).json({
                'error' : {
                    'message' : 'header Content-Type is invalid'
                }
            })
        }
        return next()
        
    } catch (error) {
        console.error('Error while validation header Type X-WWW-FORM-URLENCODED', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going error'
            }
        })
    }
}