exports.numberValidator = async (input) => {
    const number = Number(input)
    return !isNaN(number) && Number.isInteger(number)
}

exports.stringValidator = async (input) => {
    const result = typeof number === 'string'
    return result
}

exports.arrayValidator = async (input) => {
    const result = typeof number === 'array'
    return result
}

exports.converToNumberType = async (...Number) => {
    Number.map(number => {
        const numberType = Number(number)
        return numberType
    })
}

exports.convertToNumberType = async (input) => {
    return Number(input)
}