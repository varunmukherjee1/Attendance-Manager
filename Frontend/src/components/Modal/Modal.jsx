import React from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'

import classes from "./Modal.module.css"

function Modal(props) {

  // const [state,setstate]=useState({
  //   display:true
  // })

  // const closeMoal = () => {
  //   // console.log("click");
  //   setstate({...state,
  //     display:false
  //   })
  // }

  return ReactDOM.createPortal(
    <>
      <div className = {classes.modal}>
          <div className = {classes.overlay} onClick = {props.closeModal}></div>
          <div className = {classes.content}>
              <div className = {classes.cross} onClick = {props.closeModal}>&#9932;</div>
              {props.children}
          </div>
      </div>
    </>,
    document.getElementById("model")
  )
}

export default Modal