import React, {useState} from 'react'

import classes from "./Header.module.css"

function Header(props) {

  // const [isOpen , setIsOpen] = useState(false);

  const onClickHandler = () => {
    props.toggle(!props.isActive);
  }

  return (
    <div className= {classes.header}>

      <div className={classes.icon} onClick = {onClickHandler}>
        {props.isActive && <i className ="fa-solid fa-bars-staggered"></i>}
        {!props.isActive && <i class="fa-solid fa-xmark"></i>}
      </div>

    </div>
  )
}

export default Header