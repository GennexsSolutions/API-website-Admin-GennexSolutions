
const express = require('express');
const router = express.Router();
const multer = require('multer');
const CustomersController = require('../controllers/customers-controller');

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
router.post('/insertCustomers', uploadimage.single('image'), CustomersController.insertCustomers);
router.get('/getData', CustomersController.getCustomers);
router.delete('/delete/:id', CustomersController.deleteDatabyId);

module.exports = router;
