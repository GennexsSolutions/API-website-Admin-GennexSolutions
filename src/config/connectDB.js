const mongoose = require('mongoose');
const connectDB = async (req, res) => {
    try {
        await mongoose.connect('mongodb+srv://xaiy95494979:gennexsolutions@cluster0.i4xavvi.mongodb.net/gennex_solutions?retryWrites=true&w=majority&appName=Cluster0', {
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