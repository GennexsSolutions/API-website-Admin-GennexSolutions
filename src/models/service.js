const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const serviceSchema = new Schema({

    discription: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('service', serviceSchema)