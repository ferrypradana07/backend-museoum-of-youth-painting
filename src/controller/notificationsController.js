const {getNotificationsData} = require('../service/notificationService')

exports.getNotifications = async (req, res) => {
    try {
        const {userId} = req.params??''
        res.set('Content-Type', 'application/json')
        const {id} = req.decoded??''
        if (!userId || userId != id) {
            return res.status(400).json({
                'error' : {
                    'message' : 'userId is require'
                }
            })
        }
        const result = await getNotificationsData(userId)
        if (!result || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.error?result.error.message:'not found'
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