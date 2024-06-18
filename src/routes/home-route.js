
const express = require('express');
const router = express.Router();
const multer = require('multer');
const homeController = require('../controllers/home-controller');

const storage = multer.memoryStorage();  // Use memory storage for multer

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
router.post('/insertHome', uploadimage.single('image'), homeController.insertHome);
router.get('/getData', homeController.getData);
router.delete('/delete/:id', homeController.deleteDatabyId);

module.exports = router;
