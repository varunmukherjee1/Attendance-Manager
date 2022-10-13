import React, {useState} from 'react'

import Navbar from '../../components/Navbar/Navbar'
import Header from "../../components/Header/Header"

import classes from "./Dashboard.module.css"

function Dashboard() {

    const [isActive , setIsActive] = useState(true);

    return (
        <div className = {classes.dashboard}>

        <div className={classes.navbar}>
            <Navbar isActive = {isActive}/>
        </div>

        <div className = {`${classes.body} ${isActive ? classes.active: ""}`}>
            <div className={classes.header}>
                <Header isActive = {isActive} toggle = {setIsActive}/>
            </div>

            <div className= {classes.content}>
                <div>Content</div>
            </div>
        </div>
        </div>
    )
}

export default Dashboard