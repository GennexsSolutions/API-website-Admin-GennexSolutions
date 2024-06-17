const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.URL_MONGOOSE, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log('connect successfully');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
module.exports = connectDB