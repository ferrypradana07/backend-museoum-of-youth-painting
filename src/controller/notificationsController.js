const {getNotificationsData} = require('../service/notificationService')
const {convertToNumberType} = require('../utill/type')

exports.getNotifications = async (req, res) => {
    try {
        const {limit, offset} = req.query??''
        const order = req.query.order?req.query.order:'ASC'
        res.set('Content-Type', 'application/json')
        const {id} = req.decoded??''
        const newOffset = await convertToNumberType(offset)
        const newLimit = await convertToNumberType(limit)
        const result = await getNotificationsData(id, newOffset, order, newLimit)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            'notifications' : result.notifications
        })
    } catch (error) {
        console.error('Error while getnotifications in controller', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}