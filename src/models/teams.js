const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const teamSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('teams', teamSchema)