// import React, {useState} from 'react'

import profile_pic from "../../assets/profile_pic.svg"
import classes from "./Header.module.css"

function Header(props) {

  // const [isOpen , setIsOpen] = useState(false);

  // const onClickHandler = () => {
  //   props.toggle(!props.isActive);
  // }

  return (
    <div className= {classes.header}>

      {/* <div className={classes.icon} onClick = {onClickHandler}>
        {props.isActive && <i className ="fa-solid fa-bars-staggered"></i>}
        {!props.isActive && <i className ="fa-solid fa-xmark"></i>}
      </div> */}

      <h1>{props.children}</h1>

      <div>
        <img src={profile_pic} alt = ""/>
      </div>

    </div>
  )
}

export default Header