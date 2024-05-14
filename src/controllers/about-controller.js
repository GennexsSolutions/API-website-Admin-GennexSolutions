const aboutModels = require('../models/about');
exports.insertAbout = async (req, res) => {
    try {
        const { description, vision, mission } = req.body;
        const data = new aboutModels({
            description: description,
            vision: vision,
            mission: mission
        })
        if (!data) {
            res.status(404).json({
                success: false,
                message: 'data is not found',
            });
        }
        await data.save();
        res.status(201).json({
            success: true,
            message: 'insert about successfully',
            data: data,
        });

    } catch (error) {
        console.log("error==" + error)

    }
}

exports.getData = async (req, res) => {
    try {
        const data = await aboutModels.find();
        res.status(200).json({ success: true, message: 'data fetched successfully', data: data, },);
    } catch (error) {
        console.log(error)
    }
}

exports.deleteDatabyId = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await aboutModels.findById(id);
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