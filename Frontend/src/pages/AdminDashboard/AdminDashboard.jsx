import React, {useState, useEffect} from 'react'
import axios from "axios"

import Card from "../../components/Card/Card"
import Dashboard from '../../components/Dashboard/Dashboard'
import Tables from "../../components/Tables/Table"

import classes from "./AdminDashboard.module.css"

function AdminDashboard() {

    const [tableData, setTableData] = useState([]);
    const [columns , setColumns] = useState([]);

    let [students,setStudents] = useState([]);
    let [courses,setCourses] = useState([]);
    let [teachers,setTeachers] = useState([]);
    let [admins, setAdmins] = useState([]);

    const getData = async () => {

        try{

            const crs = await axios.get("api/getClasses")
            const stds = await axios.get("api/getStudents")
            const teach = await axios.get("api/getTeachers")
            const adm = await axios.get("api/getAdmins")

            if(stds.data.success){
                setStudents(stds.data.data);
            }

            if(crs.data.success){
                console.log("success");
                setCourses(crs.data.data);
            }

            if(teach.data.success){
                setTeachers(teach.data.data);
            }

            if(adm.data.success){
                admins = adm.data.data;
            }

            console.log(students)
            console.log(teachers)
            console.log(courses)
            console.log(admins)

        }catch(err){

            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    const courseColumns = [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Students",
            accessor: "students",
            Cell: ({value}) => {
                let count = value.length;

                return(
                    <div>{count}</div>
                );
            }
        },
        {
            Header: "Teachers",
            accessor: "teachers",
            Cell: ({value}) => {
                let count = value.length;

                return(
                    <div>{count}</div>
                );
            }
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: () => {
                return (<button>Remove Course</button>);
            }
        }

    ]

    const studentColumns = [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Roll No.",
            accessor: "roll_number"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: () => {
                return(<button>Remove Student</button>);
            }
        }
    ]

    const teacherColumns = [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: () => {
                return(<button>Remove Teacher</button>);
            }
        }
    ]

    const adminColumns = [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: () => {
                return(<button>Remove Admin</button>);
            }
        }
    ]

    const showCoursesHandler = async () => {
        try {
            // const res = await axios.get("api/getClasses")
            setColumns(courseColumns);
            setTableData(courses);

        } catch (error) {
            console.log("Error = " + error);
        }
    }

    const showStudentsHandler = async () => {
        try {

            // const res = await axios.get('api/getStudents')
            // console.log(columns)
            // console.log(res.data);
            setColumns(studentColumns)
            setTableData(students)
            
        } catch (error) {
            console.log(error)
        }
    }

    const showTeachersHandler = async () => {
        try {
            // const res = await axios.get('api/getTeachers')
            // console.log(res.data);
            setColumns(teacherColumns)
            setTableData(teachers)
        } catch (error) {
            console.log(error)
        }
    }

    const showAdminsHandler = async () => {
        try {
            // const res = await axios.get('api/getAdmins')
            // console.log(res.data)
            setColumns(adminColumns)
            setTableData(admins)
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Dashboard>
                {/* <h1>Admin Dashboard</h1> */}

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
                            <p>Number of Teachers</p>
                            <p>8</p>
                        </div>
                        <div className={classes["card"]}>
                            <p>Number of Courses</p>
                            <p>8</p>
                        </div>
                    </div>

                    {/* Tabs */}

                    <div className={classes["tabs"]}>
                        <div className={classes["menu"]}>
                            <input className = {classes["radio_input"]} type="radio" name="radio" id="student" />
                            <label className = {classes["radio_label"]} htmlFor="student" onClick = {showStudentsHandler}>Students</label>

                            <input className = {classes["radio_input"]} type="radio" name="radio" id="teachers" />
                            <label className = {classes["radio_label"]} htmlFor="teachers" onClick = {showTeachersHandler}>Teachers</label>

                            <input className = {classes["radio_input"]} type="radio" name="radio" id="Courses" />
                            <label className = {classes["radio_label"]} htmlFor="Courses" onClick = {showCoursesHandler}>Courses</label>

                            <input className = {classes["radio_input"]} type="radio" name="radio" id="admins" />
                            <label className = {classes["radio_label"]} htmlFor="admins" onClick = {showAdminsHandler}>Admins</label>
                        </div>
                        <div className={classes["content"]}>
                            {(columns !== [])? <Tables data = {tableData} columns = {columns}/>: <h2>Loading...</h2>}
                        </div>
                    </div>
                </Card>
            </Dashboard>
        </div>
    )
}

export default AdminDashboard