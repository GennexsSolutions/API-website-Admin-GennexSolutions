const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
//import controller
const serviceController = require('../controllers/service-controller');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const uploadimage = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
}); 

router.post('/insertservice', uploadimage.single('image'), serviceController.insertService);
router.get('/getData', serviceController.getData);
router.delete('/delete/:id', serviceController.deleteDatabyId);

module.exports = router;