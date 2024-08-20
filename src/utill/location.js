const { WEB_DOMAIN } = require("../config/config")


exports.createURL = async (query) => {
    try {
        const URL = `https://${WEB_DOMAIN}/${query}`
        return URL
    } catch (error) {
        console.log(error)
        return 'error'
    }
} 