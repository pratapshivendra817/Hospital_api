const express = require('express');

const router = express.Router();
const patientController = require('../controllers/patient_controller');
const reportsController  = require('../controllers/reports_controller');
const passport = require('passport');

// route to register a new doctor
// to prevent generation of session cookies we use session:false
router.post('/register',passport.authenticate('jwt',{session:false}),patientController.register );
// route to create a patients report
router.post('/:id/create_report',passport.authenticate('jwt',{session:true}),reportsController.createReport);
// route to watch all reports of a patient
router.post('/:id/all_reports',reportsController.getPatientReport);
module.exports = router;