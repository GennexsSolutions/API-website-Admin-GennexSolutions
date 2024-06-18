const admin = require('firebase-admin');
const serviceAccount = require('./gennex-solutions-firebase-adminsdk-qga4k-ff6578f3ce.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gennex-solutions.appspot.com'
});

const bucket = admin.storage().bucket();
module.exports = { bucket };
