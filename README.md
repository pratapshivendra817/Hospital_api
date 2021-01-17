# Hospital_api

Building API using Node

Tech Stack
Node Js
Mongo Db
Local Set Up
Step 1 :
Create a File Directory in Your Local System and run Command
git clone https://github.com/pratapshivendra817/Hospital_api
Step 2 :
Now u have package.json
To install all dependencies Run Command:
npm install

Available Scripts
In the project directory, you can run:
npm start
Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.

API Calls
To Register Doctor
Required Fields
name
email
password
API CALL : /doctor/register

Doctor Login
Required Fields
email
password
API CALL : /doctor/login
Here u recieve a Jwt Token Keep this token Safe

Register Patient
Required Fields
name
phone
API CALL : /patients/register
Pass the JWT token in header authentications as bearer to Register Patient

Create patient Report
Required Fields
status
API CALL : /patients/:id/create_report
Pass the JWT token in header authentications as bearer to Create Report
/:id   pass the Patient Phone Number

All Reports of a Specific Patient
API CALL : /patients/:id/all_reports
/:id   pass the Patient ID
Reports with specific status
API CALL : /reports/:status
/:status   pass the status
For Example:
Negative , Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit
