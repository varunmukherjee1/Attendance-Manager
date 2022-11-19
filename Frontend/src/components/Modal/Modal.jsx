import React from 'react'
import ReactDOM from 'react-dom'

import classes from "./Modal.module.css"

function Modal(props) {

  const closeHandler = () => {
    console.log("click");
  }

  return ReactDOM.createPortal(
    <>
      <div className = {classes.modal}>
          <div className = {classes.overlay} onClick = {props.closeModel}></div>
          <div className = {classes.content}>
              <div className = {classes.cross} onClick = {props.closeModel}>&#9932;</div>
              <div></div>
              {props.children}
          </div>
      </div>
    </>,
    document.getElementById("model")
  )
}

export default Modal