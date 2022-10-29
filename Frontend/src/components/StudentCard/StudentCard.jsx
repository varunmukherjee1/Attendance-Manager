import React from 'react'
import classes from "./StudentCard.module.css"
// import QrModal from '../QrModal/QrModal'
// import {QRious} from 'react-qrious'

function StudentCard(props) {
  return (
    <div className={classes.card_container}>
      <div className = {classes.card}>
          <p className={classes.class_name}>{props.title}</p>
          <img src={props.src} alt={"Image not found"} className={classes.teacher_img}/>
          <p className={classes.teacher_name}>{props.teacher}</p>
          <input type={"button"} value={"Get QR Code"}  onClick={props.qrCode}/><br />
          <input type={"button"} value={"See Attendance"} onClick={props.seeAtt}/>
          {/* <QrModal name={props.teacher} roll_number="test"/>
          <QRious value={props.teacher}/> */}
      </div>
    </div>
  )
}

export default StudentCard