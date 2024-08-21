
const {createCollectionData, deleteCollectionData, getCollectionData, getUserCollectionsData} = require('../service/collectionService')
const {numberValidator, convertToNumberType} = require('../utill/type')
const {exportImageId} = require('../utill/array')
const {getURLimageByImageId} = require('../service/imageService')

exports.getUserCollection = async(req, res) => {
    try {
        const {userId} = req.params??'';
        const {offset, limit} = req.query??'';
        if (!userId || !offset || !limit) {
            return res.status(400).json({
                'error' : {
                    'message' : 'userId, offset and limit are required'
                }
            })
        }
        const validType = await numberValidator(offset) &&  await numberValidator(limit)
        if (!validType) {
            return res.status(400).json({
                'error' : {
                    'message' : 'offset or limit type are invalid'
                }
            })
        }
        const order = 'ASC'
        const newOffset = await convertToNumberType(offset)
        const newLimit = await convertToNumberType(limit)
        const collections = await getUserCollectionsData(userId, newOffset, order, newLimit)
        if (collections.failed || collections.error) {
            return res.status(400).json({
                'error' : {
                    'message' : collections.failed?collections.failed.message:collections.error.message
                }
            })
        }
        const array = await exportImageId(collections)
        const result = await getURLimageByImageId(array)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            'collections' : result
        })
    } catch (error) {
        console.error('Error while getting collection in controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}
