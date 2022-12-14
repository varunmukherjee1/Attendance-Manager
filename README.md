# Automated attendance capturing and management system
## Problem Statement
At present, as we can see that in offline classes we use the traditional method of taking attendance (by using pen-paper) because there is no such options available which can handle this task. So, we have focussed more on created an integrated web application which can capture the attendance of the students and stores it in the database under a single roof which is under the admin supervision.

## How to run this project?
- Download and Install node
- Open git bash in any folder
- Clone the repo using below command
```
git clone https://github.com/varunmukherjee1/Attendance-Manager.git
```
- Move to the project folder
```
cd Attendance-Manager
```
- Now run these commands on the terminal/powershell/git bash
```
cd Frontend
npm install
npm start
```
- After that open a new terminal and run below commands
```
cd Backend
npm install
npm start
```
- Now go to this link http://127.0.0.1:3000

## Screenshots

### Home Page
![Home_page_1](/screenshots/home.png)

### Login/Signup page
![Login_page](/screenshots/login.png)
![SignUp_page](/screenshots/register.png)


### Teacher's Dashboard
![teachers_dashboard](/screenshots/teacherDashboard.png)

### Admin's Dashboard
![admin_dashboard](/screenshots/adminDashboard.png)

### Student's Dashboard
![student_dashboard](/screenshots/studentDashboard.png)

## Functional Description
* Secure login Authentication (Signup and then Login).
* Unique QR Code for each and every class.
* Encrypted Password for security.

### Admin
* Can add new admin in the database.
* Can view students, teachers, courses and other admins details.
* Can remove students, teachers, courses and admins.

### Teacher
* Can generate new QR codes for the students for each and every class.
* Can generate/download excel file of the attendance of the students.
* Can add new teachers in the class.
* Can add new students in the class.
* Can remove the class from the database.
* Can scan the QR codes of the students for marking them present.
* Can update their profile.

### Student
* Can see their attendance status in the class for each and every date.
* Can get their QR code on the dashboard for scanning after class.
* Can update their profile (password and all).


## Team Members
- Varun Kumar Bansal
- Varun Mukherjee
- Saket Ranjan
- Mudavath Sugali Rohan
- Mudi Krishna Vamsi
