const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about-controller');


router.post('/addAbout', aboutController.insertAbout);
router.get("/getData", aboutController.getData);
router.delete('/delete/:id',aboutController.deleteDatabyId)




module.exports = router;