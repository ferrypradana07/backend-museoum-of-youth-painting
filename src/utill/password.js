exports.passwordValidation = async (password) => {
    try {
        const hasSymbol =  /[!@#$%^&*(),.?":{}|<>]/
        const hasNumber =  /\d/
        const containNumber = hasNumber.test(password)
        const containSymbol = hasSymbol.test(password)
        const minLength = password.length > 10 ? true : false
        return {
            containNumber,
            containSymbol,
            minLength
        }
        // return {
        //     number : containNumber,
        //     symbol : containSymbol,
        //     length : minLength
        // }
    } catch (error) {
        console.error('Error while validating password in utill', error)
        return {
            'number' : false,
            'symbol' : false,
            'length' : false,
        }
    }
}