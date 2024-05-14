const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact-controller');


router.post('/contact', contactController.insertContact);
router.get("/getData", contactController.getData);
router.delete('/delete/:id',contactController.deleteDatabyId)




module.exports = router;