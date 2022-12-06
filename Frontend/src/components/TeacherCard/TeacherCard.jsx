import React,{useState} from 'react'
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
            <input type={"button"} value={"Add Teacher"} onClick={addTeacherModal}/>
            <input type={"button"} value={"Remove Class"} onClick={props.removeClass}/>
          </div>
          {/* <QrModal name={props.teacher} roll_number="test"/>
          <QRious value={props.teacher}/> */}
      </div>
    </div>
  )
}

export default TeacherCard