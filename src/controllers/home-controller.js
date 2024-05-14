const homeModel = require('../models/home');

exports.insertHome = async (req, res) => {
    try {
        const { description } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const data = new homeModel({
            description: description,
            image: req.file.path
        });

        await data.save();
        res.status(201).json({ success: true, message: 'Data inserted successfully', data: data });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


exports.getData = async (req, res) => {
    try {
        const data = await homeModel.find();
        res.status(200).json({ success: true, message: 'data fetched successfully', data: data, },);
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