const homeModel = require('../models/home');
const { bucket } = require('../config/firebaseConfig');
const path = require('path');

exports.insertHome = async (req, res) => {
    try {
        const { description } = req.body;
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
            const data = new homeModel({
                description: description,
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
};



exports.getData = async (req, res) => {
    try {
        const data = await homeModel.find();
        res.status(200).json({ success: true, message: 'data fetched successfully', data: data, });
    } catch (error) {
        console.log(error)
    }
}

exports.deleteDatabyId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await homeModel.findById(id);
        if (!data) {
            res.status(404).json({ error: "ບໍ່ມີໄອດີນີ້ໃນລະບົບ" });
        } else {
            await data.deleteOne({ _id: id });
            res.status(200).json({ message: "ລົບຂໍ້ມູນສຳເລັດແລ້ວ" });
        }
    } catch (error) {
        console.log(error);
    }
};