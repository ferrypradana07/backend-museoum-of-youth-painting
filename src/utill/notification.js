exports.createNotifObject = async (userId, usernamePost, messaga) => {
    try {
        const result = {
            'userId' : userId,
            'title' : 'your image liked by ' + usernamePost,
            'message': messaga
        } 
        return result
    } catch (error) {
        console.error('Error while validating password in utill', error)
        return {
            'error' : 'something going wrong'
        }
    }
}

exports.createArrayNotifObject = async (arrayUserId, title, message) => {
    try {
        const result = arrayUserId.map(userId => ({
            'userId' : userId,
            'title' : title,
            'message': message
        }))
        return result
    } catch (error) {
        console.error('Error while validating password in utill', error)
        return {
            'error' : 'something going wrong'
        }
    }
}