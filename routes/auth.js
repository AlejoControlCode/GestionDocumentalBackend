const express = require('express');
const {loggin,logout}= require('../controllers/authController');
const router = express.Router();

router.post('/auth/login', loggin);
router.post('/auth/logout', logout);
module.exports = router;