import React from 'react'

import Navbar from '../../components/Navbar/Navbar'
import Header from "../../components/Header/Header"

import classes from "./Dashboard.module.css"

function Dashboard() {
  return (
    <div className = {classes.dashboard}>

        <div className={classes.navbar}>
            <Navbar/>
        </div>

        <div className={classes.body}>
            <div className={classes.header}>
                <Header/>
            </div>

            <div className= {classes.content}>
                <div>Content</div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard