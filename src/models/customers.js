const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({

    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('customers', CustomerSchema);