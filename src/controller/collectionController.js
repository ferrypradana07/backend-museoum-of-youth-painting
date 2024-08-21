
const {createCollectionData, deleteCollectionData} = require('../service/collectionService')

exports.createCollection = async(req, res) => {
    try {
        const {imageId} = req.params??'';
        const {id} = req.decoded??'';
        if (!imageId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'imageId is required'
                }
            })
        }
        const result = await createCollectionData(id, imageId)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            'message' : 'success'
        })
    } catch (error) {
        console.error('Error while creating collection in controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}

exports.deleteCollection = async(req, res) => {
    try {
        const {imageId} = req.params??''
        const {id} = req.decoded??''
        if (!imageId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'imageId is required'
                }
            })
        }
        const result = await deleteCollectionData(id, imageId)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            'message' : 'success'
        })
    } catch (error) {
        console.error('Error while creating collection in controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}