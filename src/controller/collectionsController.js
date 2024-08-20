
const {createCollectionData, deleteCollectionData, getCollectionData, getUserCollectionsData} = require('../service/collectionService')
const {numberValidator} = require('../utill/type')

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
        const result = await getUserCollectionsData(offset, order, limit)
        if (!result || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : 'failed create like'
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
