const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    description: {
        type: String,
    },
    name: {
        type: String,
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);