const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PartnerSchema = new Schema({

    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('partner', PartnerSchema);