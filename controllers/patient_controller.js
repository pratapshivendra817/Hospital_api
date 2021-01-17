const Patient = require('../models/patient');
const passport = require('passport');
// register the new patient
module.exports.register = function(req, res){
    Patient.findOne({phone: req.body.phone}, function(err, patient){
        // finding patient if present
        console.log(err);
        if (!patient){
            Patient.create(req.body, function(err, patient){
                if(err){
                    console.log(`Error in creating patient:${error}`)
                    return res.json(409,{
                        message:'Error in creating patient'
                    })
                }else{
                    console.log('here')
                    return res.json(200,{
                        message:'Registration Successful',
                        details:{
                            name :patient.name,
                            phone : patient.phone
                        }
                    })
                }

            })
            // returning info if patient already registered
        }else{
            return res.json(409,{
                message:'User already exists',
                details:{
                    name : patient.name,
                    phone:patient.phone
                } 
            })
        }

    });
}