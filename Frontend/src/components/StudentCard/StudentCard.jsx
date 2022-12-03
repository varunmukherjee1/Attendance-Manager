import React, {useState} from 'react'
import classes from "./StudentCard.module.css"
import profile_pic from "../../assets/profile_pic.svg"
import {Link , useNavigate} from "react-router-dom"
import { useEffect } from 'react';
// import QrModal from '../QrModal/QrModal'
// import {QRious} from 'react-qrious'

function StudentCard(props) {

  // console.log("props :-")
  // console.log(props);

  const navigate = useNavigate();
  const [id, setId] = useState(props.classId)

  const seeAttendance = () => {
    const url = '/seeAttendance/' + id
    // console.log(url);
    navigate(url)
  }

  const getQr = () => {
    props.qrCode(props.classId)
  }

  return (
    <div className={classes.card_container}>
      <div className = {classes.card}>
          <p className={classes.class_name}>{props.title}</p>
          <img src={profile_pic} alt={"Image not found"} className={classes.teacher_img}/>
          <p className={classes.teacher_name}>{props.teacher}</p>
          <input type={"button"} value={"Get QR Code"}  onClick={getQr}/><br />
          <input type={"button"} value={"See Attendance"} onClick={seeAttendance}/>
          {/* <QrModal name={props.teacher} roll_number="test"/>
          <QRious value={props.teacher}/> */}
      </div>
    </div>
  )
}

export default StudentCard