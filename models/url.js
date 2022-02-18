const mongoose = require('mongoose')

const url = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        minLenght: 7,
    },
    uId: {
        type: String,
        required: true,
        minLenght: 7,
    },
    expirationDate: {
        type: Date        
    }
}) 

module.exports = mongoose.model('Url', url)