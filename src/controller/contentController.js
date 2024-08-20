
const {getImageDetailData} = require('../service/contentService')

exports.getImageDetail = async (req, res) => {
    try {
        const {imageId} = req.params??'';
        const {id} = req.decoded??'';
        res.set('Content-Type', 'application/json')
        if (!imageId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'imageId is require'
                }
            })
        }
        const result = await getImageDetailData(imageId, id)
        if (!result || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.error?result.error.message:'not found'
                }
            })
        }
        res.status(200).json({
            image : result
        })
    } catch (error) {
        console.error('error while getting image', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}
