const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aboutSchema = new Schema({

    description: {
        type: String,
        required: true
    },
    vision: {
        type: String,
        required: true
    },
    mission: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('about', aboutSchema)