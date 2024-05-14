const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
//import controller
const projectController = require('../controllers/project-controller');
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

router.post('/insertproject', uploadimage.single('image'), projectController.insertProject);
router.get('/getData', projectController.getData);
router.delete('/delete/:id', projectController.deleteDatabyId);

module.exports = router;