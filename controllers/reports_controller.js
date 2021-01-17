const Report = require('../models/patient_report');
const Patient = require('../models/patient');
const e = require('express');
// function to create a new report
module.exports.createReport = function(req,res){
    const { passport } = req.session;
    // getting details of the doctor from current session
    const doctor = passport.user;
    Patient.findById(req.params.id,function(err,patient){
        if(err){
            console.log(`Error in finding patient  ${err}`);
            return res.json(422,{
                message:"No Patient with ID found"
            })
        }
        // creating a report for a patient
        Report.create({
            doctor:doctor.name,
            patient:patient.name,
            status:req.body.status
        },function(err,report){
            if(err){
                console.log('Error in creating report');
                return res.json(422,{
                    message:"Internal Server Error"
                })
            }
            // saving report in patients info
            patient.reports.push(report);
            patient.save();
            return res.json(200,{
                message:"Report created Successfully",
                details:{
                    doctor:doctor.name,
                    doctorEmail:doctor.email,
                    patient:patient.name,
                    status:report.status,
                    createdAt:report.createdAt
                }
            });
        })

    })
    
}

// function to ge all reports for a given patient
module.exports.getPatientReport = async function(req,res){

    try {
        const patient = await   Patient.findById(req.params.id);
        
        
        if(patient){
            let all_report = [];
            for(let i=0;i<patient.reports.length;i++){
                // fetching report accordingly
                const report = await Report.findById(patient.reports[i]);
                if(report){
                    let single_report = new Object();
                    single_report.doctor = report.doctor;
                    single_report.patient = report.patient;
                    single_report.status = report.status;
                    single_report.testedOn = report.createdAt;
                    all_report.push(single_report);
                }
            }
            res.json(200,{
                message: `All Reports For ${patient.name}`,
                numberOfTimesTested:patient.reports.length,
                reports:all_report
            })
        }
        
    } catch (error) {
        return res.jason(422,{
            message:"Internal Server Error"
        })
    }
    
}

// function to fetch reports of patients with respect to status

module.exports.filterReports = async function(req,res){
    try {
        let requestedStatus=req.params.status;
        let allReports = await Report.find({status:requestedStatus});
        const reportArray = [];
        for (let i of allReports) {
          const { doctor, patient, createdAt, status } = i;
          const reportObject = {
            Doctor: doctor,
            Patient: patient,
            TestedOn: createdAt,
            Status: status,
          };
          reportArray.push(reportObject);
        }
        return res.status(200).send({
          message: `Reports with Status : ${requestedStatus}`,
          report: reportArray,
        });

    } catch (error) {
        console.log(error);
        return res.json(422,{
            message:"Internal Server error"
        })
    }
}