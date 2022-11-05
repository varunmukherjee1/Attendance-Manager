import React, {useState} from 'react'

import Navbar from '../Navbar/Navbar'
import Header from "../Header/Header"

import classes from "./Dashboard.module.css"

function Dashboard(props) {

    const [isActive , setIsActive] = useState(true);

    return (
        <div className = {classes.dashboard}>
            <div className={classes.navbar}>
                <Navbar isActive = {isActive}/>
            </div>

            <div className = {`${classes.body} ${isActive ? classes.active: ""}`}>
                <div className={classes.header}>
                    <Header isActive = {isActive} toggle = {setIsActive}>
                        Dashboard
                    </Header>
                </div>

                <div className= {classes.content}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Dashboard