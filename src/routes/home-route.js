const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const homeController = require('../controllers/home-controller');

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
        fileSize: 1024 * 1024 * 5 // 5MB file size limit
    }
});

/* Routes */
router.post('/insertHome', uploadimage.single('image'), homeController.insertHome); // Allow up to 10 images
router.get('/getData', homeController.getData);
router.delete('/delete/:id', homeController.deleteDatabyId);

module.exports = router;
