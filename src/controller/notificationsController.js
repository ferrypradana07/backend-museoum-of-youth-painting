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