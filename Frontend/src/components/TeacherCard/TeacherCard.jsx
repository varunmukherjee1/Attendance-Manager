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
          <input type={"button"} value={"Get QR Code"}  onClick={props.qrCode}/><br />
          <input type={"button"} value={"See Attendance"} onClick={props.seeAtt}/>
          {/* <QrModal name={props.teacher} roll_number="test"/>
          <QRious value={props.teacher}/> */}
      </div>
    </div>
  )
}

export default TeacherCard