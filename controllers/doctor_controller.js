const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');
// register a new doctor
module.exports.register = function(req, res){
    Doctor.findOne({email: req.body.email}, function(err, doctor){
        
        if (!doctor){
            Doctor.create(req.body, function(err, doctor){
                if(err){
                    console.log(`Error in creating doctor:${error}`)
                    return res.json(409,{
                        message:'Error in creating user'
                    })
                }else{
                    return res.json(200,{
                        message:'Registration Successful',
                        details:{
                            name:doctor.name,
                            email:doctor.email
                        }
                    })
                }

            })
        }else{
            return res.json(409,{
                message:'User already exists',
                details:{
                    name:doctor.name,
                    email:doctor.email
                }
            })
        }

    });
}
// create a session for the doctor
module.exports.createSession = async function(req,res){
    try {
        let doctor = await Doctor.findOne({email:req.body.email})
        
        if(!doctor || doctor.password !=req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
            });
            
        }
        return res.json(200,{
            message:"Sign in successful,here is your token, please keep it safe",
            data:{
                token:jwt.sign(doctor.toJSON(),'hospital',{expiresIn:'7000000'})
            }
        })

    } catch (error) {
            console.log('*******',err);
            return res.json(500,{
                message:"Internal Server error"
            })
        
    }
}