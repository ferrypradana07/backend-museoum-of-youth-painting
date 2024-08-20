
exports.getLocalDate = () => {
    const fullDate = new Date()
    console.log(date)
    let date = `${fullDate.getFullYear()}:${String(fullDate.getMonth()).padStart(0)}:${fullDate.getDate()}`
    console.log(date)
    return date
}

exports.getDate = () => {
    const fullDate = new Date()
    return fullDate
}