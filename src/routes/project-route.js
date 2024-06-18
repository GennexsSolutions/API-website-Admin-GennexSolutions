const express = require('express');
const router = express.Router();
const multer = require('multer');
//import controller
const projectController = require('../controllers/project-controller');

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
router.post('/insertproject', uploadimage.single('image'), projectController.insertProject);
router.get('/getData', projectController.getData);
router.delete('/delete/:id', projectController.deleteDatabyId);

module.exports = router;