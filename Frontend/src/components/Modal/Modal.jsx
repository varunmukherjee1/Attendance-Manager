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
              <div>
                <label for="ClassName">Class Name</label>
                <input type="text" name="ClassName" />
              </div>
              <div>
                <label >Add Students</label>
                <input type="file" name="Files" accept='.csv'  />
              </div>
              <div>
                <label >Add Teachers</label>
                <input type="file" name="Files" accept='.csv'  />
              </div>
              
              {props.children}
          </div>
      </div>
    </>,
    document.getElementById("model")
  )
}

export default Modal