const express = require('express');
// router configuration
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/',homeController.home );
// for routes related to doctor
router.use('/doctors',require('./doctor'));
// for routes related to patient
router.use('/patients',require('./patient'));
// routes for reports
router.use('/reports',require('./reports'));

module.exports = router;