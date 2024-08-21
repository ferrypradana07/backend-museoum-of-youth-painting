exports.validEmail = async (email) => {
    try {
        if (email.endsWith('.com') && email.includes('@')){
            return true
        }
        return false
    } catch (error) {
        console.error('Error while validating email',error)
        return {'error' : false}
    }
}