const { WEB_DOMAIN } = require("../config/config")


exports.createURL = async (query) => {
    try {
        const URL = `https://${WEB_DOMAIN}/${query}`
        return URL
    } catch (error) {
        console.error('Error while create URL in utill',error)
        return {'error' : {
            'message' : 'something going error'
        }}
    }
} 