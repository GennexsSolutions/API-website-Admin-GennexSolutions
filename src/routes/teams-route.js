const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
//import controller
const teamsController = require('../controllers/teams-controller');
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

router.post('/insertTeams', uploadimage.single('image'), teamsController.insertTeams);
router.get('/getData', teamsController.getData);
router.delete('/delete/:id', teamsController.deleteDatabyId);

module.exports = router;