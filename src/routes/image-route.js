const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/controller');



router.get("/getData/:image_name",ImageController.ImageController);




module.exports = router;