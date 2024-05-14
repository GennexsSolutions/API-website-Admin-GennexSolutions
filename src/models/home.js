const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const homeSchema = new Schema({
   
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('home', homeSchema);