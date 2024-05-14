const projectModels = require('../models/project');
exports.insertProject = async (req, res) => {
    try {
        const { discription, name } = req.body;
        const data = new projectModels({
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
        const data = await projectModels.find();
        res.status(201).json({ success: true, message: 'data get successfully', data: data, },);
    } catch (error) {
        console.log("error==" + error)
    }
}

exports.deleteDatabyId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await projectModels.findById(id);
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