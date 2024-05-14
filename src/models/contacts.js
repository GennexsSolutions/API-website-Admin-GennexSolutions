const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactSchema = new Schema({
    description: {
        type: String,
        required: true
    },

    tell: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('contacts', contactSchema)