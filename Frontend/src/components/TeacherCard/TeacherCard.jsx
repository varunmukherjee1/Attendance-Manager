import React from 'react'
import classes from "./TeacherCard.module.css"
import profile_pic from "../../assets/profile_pic.svg"
// import QrModal from '../QrModal/QrModal'
// import {QRious} from 'react-qrious'

function TeacherCard(props) {
  return (
    <div className={classes.card_container}>
      <div className = {classes.card}>
          <p className={classes.class_name}>{props.title}</p>
          <img src={profile_pic} alt={"Not found"} className={classes.teacher_img}/>
          <p className={classes.teacher_name}>{props.teacher}</p>
          <div className={classes.button_div}>
            <input type={"button"} value={"Generate QR Code"}  onClick={props.qrCode}/><br />
            <input type={"button"} value={"See Attendance"} onClick={props.seeAtt}/>
            <input type={"button"} value={"Scan QR code"} onClick={props.scanQR}/>
            <input type={"button"} value={"Add Student"} onClick={props.addStudent}/>
            <input type={"button"} value={"Add Teacher"} onClick={props.addTeacher}/>
            <input type={"button"} value={"Remove Class"} onClick={props.removeClass}/>
          </div>
          {/* <QrModal name={props.teacher} roll_number="test"/>
          <QRious value={props.teacher}/> */}
      </div>
    </div>
  )
}

export default TeacherCard