const serviceModels = require('../models/service');

exports.insertService = async (req, res) => {
    try {
        const { discription, name, image } = req.body;
        const data = new serviceModels({
            discription: discription,
            name: name,
            image: req.file.path
        })
        if (!data) {
            res.status(404).json({ success: false, message: 'data is not found', },);
        }
        await data.save();
        res.status(201).json({ success: true, message: 'data inserted successfully', data: data, },);
    } catch (error) {
        console.log("error==" + error)
    }
}

exports.getData = async (req, res) => {
    try {
        const data = await serviceModels.find();
        res.status(201).json({
            success: true,
            message: 'data get successfully',
            data: data,
        });
    } catch (error) {
        console.log("error==" + error)
    }
}

exports.deleteDatabyId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await serviceModels.findById(id);
        if (!data) {
            res.status(404).json({ error: "ບໍ່ມີໄອດີນີ້ໃນລະບົບ" });
        } else {
            await data.deleteOne({ _id: id });
            res.status(200).json({ message: "ລົບຂໍ້ມູນສຳເລັດແລ້ວ" });
        }
    } catch (error) {
        console.log(error);
    }
}