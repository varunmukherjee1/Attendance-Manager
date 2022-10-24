import React, {useState} from 'react'

// import Navbar from '../../components/Navbar/Navbar'
// import Header from "../../components/Header/Header"
import Card from "../../components/Card/Card"
import Dashboard from '../Dashboard/Dashboard'

import classes from "./AdminDashboard.module.css"

function AdminDashboard() {

    // const [isActive , setIsActive] = useState(true);

    return (
        <div>
            <Dashboard>
                <h1>Admin Dashboard</h1>

                <Card>
                    {/* Buttons */}
                    <div className = {classes.adminActions}>
                        <button>Add new admin</button>
                        <button>Remove admin</button>
                    </div>

                    {/* Summary */}
                    <div className = {classes.summary}>
                        <div className={classes["card"]}>
                            <p>Number of Students</p>
                            <p>8</p>
                        </div>
                        <div className={classes["card"]}>
                            <p>Number of Students</p>
                            <p>8</p>
                        </div>
                        <div className={classes["card"]}>
                            <p>Number of Students</p>
                            <p>8</p>
                        </div>
                    </div>

                    {/* Tabs */}

                    <div className={classes["tabs"]}>
                        <div className={classes["menu"]}>
                            <input className = {classes["radio_input"]} type="radio" name="radio" id="student" />
                            <label className = {classes["radio_label"]} htmlFor="student">Students</label>

                            <input className = {classes["radio_input"]} type="radio" name="radio" id="teachers" />
                            <label className = {classes["radio_label"]} htmlFor="teachers">Teachers</label>

                            <input className = {classes["radio_input"]} type="radio" name="radio" id="Courses" />
                            <label className = {classes["radio_label"]} htmlFor="Courses">Courses</label>

                            <input className = {classes["radio_input"]} type="radio" name="radio" id="admins" />
                            <label className = {classes["radio_label"]} htmlFor="admins">Admins</label>
                        </div>
                        <div className={classes["content"]}>
                            <h1>content</h1>
                        </div>
                    </div>
                </Card>
            </Dashboard>
        </div>
    )
}

export default AdminDashboard