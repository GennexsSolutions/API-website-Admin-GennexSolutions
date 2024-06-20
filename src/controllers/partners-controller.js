const partnerModels = require('../models/partners');
const { bucket } = require('../config/firebaseConfig');
const path = require('path');

exports.insertPartners = async (req, res) => {
    try {
        const file = req.file;
        const fileName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;

        // Upload to Firebase
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobStream.on('error', (err) => {
            console.log("Error uploading to Firebase:", err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        });

        blobStream.on('finish', async () => {
            const publicUrl = `${blob.name}`;
            const data = new partnerModels({
                image: publicUrl  // Save the public URL
            });

            await data.save();
            res.status(201).json({ success: true, message: 'Data inserted successfully', data: data });
        });

        blobStream.end(file.buffer);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


exports.getPartners = async (req, res) => {
    try {
        const data = await partnerModels.find();
        res.status(200).json({ success: true, message: 'data fetched successfully', data: data, });
    } catch (error) {
        console.log(error)
    }
}