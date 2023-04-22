import React,{useRef, useState} from 'react'
import classes from "./TeacherCard.module.css"
import profile_pic from "../../assets/profile_pic.svg"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

import Modal from '../Modal/Modal'
import AddStudentModal from '../AddStudentModal/AddStudentModal'
import AddTeacherModal from '../AddTeacherModal/AddTeacherModal'

function TeacherCard(props) {
  const navigate = useNavigate()

  const [stateAddTeacher,setstateAddTeacher]=useState({
    display:false
  });
  const [stateAddStudent,setstateAddStudent]=useState({
      display:false
  });

  const [addStudentsModal,setAddStudentsModal] = useState(false);
  const [addTeachersModal,setAddTeachersModal] = useState(false);

  const stdsRef = useRef();
  const teachRef = useRef();

  const seeAttendance = () => {
    const url = "/seeAttendance/" + props.id
    navigate(url)
  }

  const generateQrCode = async () => {
    console.log("test");
    const res = await axios.get("/auth/generateQrCode/" + props.id)
    console.log(res);
    if(res.status === 200) {
      if(res.data.success === true) {
        toast.success("QR generated")
      }
      else {
        toast.error("Cannot generate QR")
      }
    }
    else {
      toast.error("Some internal error occurred. Please try again.")
    }
  }

  const scanQr = () => {
    props.scanQR(props.id)
  }

  function addStudentModal(){

    setstateAddStudent({
        ...stateAddStudent,
        display:true
    })
  }

  // Student

  function AddStudentModalFunc(){
      if(stateAddStudent.display){
          return (
              <Modal closeModal = {closeAddStudentModal}>
                  <AddStudentModal addStudent = {addStudent}/>
              </Modal>
          )
      }
  }

  function closeAddStudentModal(){
      setstateAddStudent({
          ...stateAddStudent,
          display:false
      })
  }


  const addStudent = async (email) => {
    try {
      
      const res = await axios.post("/auth/addStudent/" + props.id,{
        studentEmail:email
      })
      
      if(res.data.success){
        toast.success("Student added successfully")
        closeAddStudentModal();
      }
      else{
        toast.error("Couldn't Add Student")
      }
      
      closeAddStudentModal()
      
    } catch (error) {
      console.log(error);
      closeAddStudentModal();
      toast.error("Something went Wrong")
    }
  }

  // Teacher
  function addTeacherModal(){
          
    setstateAddTeacher({
        ...stateAddTeacher,
        display:true
    })
  }

  function AddTeacherModalFunc(){
    if(stateAddTeacher.display){
        return (
            <Modal closeModal = {closeAddTeacherModal}>
                <AddTeacherModal addTeacher = {addTeacher}/>
            </Modal>
        )
    }
  }

  function closeAddTeacherModal(){
    setstateAddTeacher({
        ...stateAddTeacher,
        display:false
    })
  }

  const addTeacher = async (email) => {
    try {
      
      const res = await axios.post("/auth/addTeacher/" + props.id,{
        teacherEmail:email
      })
      
      if(res.data.success){
        toast.success("Teacher added successfully")
        closeAddTeacherModal();
      }
      else{
        toast.error("Couldn't Add Teacher")
      }
      
      closeAddTeacherModal();
      
    } catch (error) {
      console.log(error);
      closeAddTeacherModal();
      toast.error("Something went Wrong")
    }
  }

  const removeHandler = () => {
    props.removeClass(props.id)
  }

  const openAddStudentsModal = () => {
    setAddStudentsModal(true)
  }

  const openAddTeachersModal = () => {
    setAddTeachersModal(true)
  }
  
  const closeAddStudentsModal = () => {
    setAddStudentsModal(false)
  }

  const closeAddTeachersModal = () => {
    setAddTeachersModal(false)
  }

  const addTeachersHandler = async (e) => {
    try {
      e.preventDefault();

      toast.success("submitted")
      
    } catch (error) {
      toast.error("Something went wrong")
      console.log("Error :-");
      console.log(error);
    }
  }

  const addStudentsHandler = async (e) => {
    try {
      e.preventDefault();

      const students = stdsRef.current.files[0];

      let formData = new FormData();

      formData.append("students",students)

      toast.success("Submitted")
      
    } catch (error) {
      toast.error("Something went wrong")
      console.log("Error :-");
      console.log(error);
    }
  }

  return (
    <div className={classes.card_container}>
      {AddStudentModalFunc()}
      {AddTeacherModalFunc()}
      <div className = {classes.card}>
          <p className={classes.class_name}>{props.title}</p>
          <img src={profile_pic} alt={"Not found"} className={classes.teacher_img}/>
          <p className={classes.teacher_name}>{props.teacher}</p>
          <div className={classes.button_div}>
            <input type={"button"} value={"Generate QR Code"}  onClick={generateQrCode}/><br />
            <input type={"button"} value={"See Attendance"} onClick={seeAttendance}/>
            <input type={"button"} value={"Scan QR code"} onClick={scanQr}/>
            <input type={"button"} value={"Add Student"} onClick={addStudentModal}/>
            <input type={"button"} value={"Add Students"} onClick={openAddStudentsModal}/>
            <input type={"button"} value={"Add Teacher"} onClick={addTeacherModal}/>
            <input type={"button"} value={"Add Teachers"} onClick={openAddTeachersModal}/>
            <input type={"button"} value={"Remove Class"} onClick={removeHandler}/>
          </div>
          {/* <QrModal name={props.teacher} roll_number="test"/>
          <QRious value={props.teacher}/> */}
      </div>
      {addStudentsModal && 
        <Modal closeModal = {closeAddStudentsModal}>
            <div className = {classes.formDiv}>
              <form onSubmit = {addStudentsHandler}>
                <label htmlFor="stds">Students</label>
                <input ref = {stdsRef} type="file" name="students" id="stds" />
                <button type="submit">Submit</button>
              </form>
            </div>
        </Modal>
      }
      {addTeachersModal && 
        <Modal closeModal = {closeAddTeachersModal}>
            <div className = {classes.formDiv}>
              <form onSubmit = {addTeachersHandler}>
                <label htmlFor="profs">Teachers</label>
                <input ref = {teachRef} type="file" name="teachers" id="profs" />
                <button type="submit">Submit</button>
              </form>
            </div>
        </Modal>
      }
    </div>
  )
}

export default TeacherCard