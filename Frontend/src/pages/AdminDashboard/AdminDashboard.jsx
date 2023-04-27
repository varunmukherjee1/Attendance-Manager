import React, {useState, useEffect, useRef} from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { search } from '@orama/orama';
// import {URL} from "../../constants/backend"

import Card from "../../components/Card/Card"
import Dashboard from '../../components/Dashboard/Dashboard'
import Tables from "../../components/Tables/Table"
import { loadingActions } from '../../store/loadingSlice'
import Modal from "../../components/Modal/Modal"

import {courseDb} from "../../search/courses"
import {studentDb} from "../../search/students"
import {teachersDb} from "../../search/teachers"
import {adminDb} from "../../search/admins"


import classes from "./AdminDashboard.module.css"

function AdminDashboard() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const admPassRef = useRef();
    const searchRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tableData, setTableData] = useState({
        field: "none",
        data: []
    });
    const [columns , setColumns] = useState([]);

    let [students,setStudents] = useState([]);
    let [courses,setCourses] = useState([]);
    let [teachers,setTeachers] = useState([]);
    let [admins, setAdmins] = useState([]);
    let [showModal,setShowModal] = useState(false)

    const getData = async () => {

        try{

            dispatch(loadingActions.showLoading())

            const crs = await axios.get("/api/getClasses")
            const stds = await axios.get("/api/getStudents")
            const teach = await axios.get("/api/getTeachers")
            const adm = await axios.get("/api/getAdmins")

            dispatch(loadingActions.hideLoading())

            if(stds.data.success){
                setStudents(stds.data.data);
            }

            if(crs.data.success){
                // console.log("success");
                setCourses(crs.data.data);
            }

            if(teach.data.success){
                setTeachers(teach.data.data);
            }

            if(adm.data.success){
                setAdmins(adm.data.data);
            }

        }catch(err){

            dispatch(loadingActions.hideLoading())
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

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
            Cell: (cdata) => {

                const caller = () => {
                    removeCourses(cdata.cell.row.index)
                }
                return (<button onClick = {caller} >Remove Course</button>);
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
            Cell: (cdata) => {

                const caller = () => {
                    removeStudent(cdata.cell.row.index)
                }
                // console.log(cdata.cell.row.index)
                return(<button onClick = {caller}>Remove Student</button>);
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
            Cell: (cdata) => {

                const caller = () => {
                    removeTeacher(cdata.cell.row.index)
                }
                return(<button onClick = {caller}>Remove Teacher</button>);
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
            Cell: (cdata) => {

                const caller = () => {
                    removeAdmin(cdata.cell.row.index)
                }
                return(<button onClick = {caller}>Remove Admin</button>);
            }
        }
    ]

    const removeStudent = async (idx) => {
        try {
            
            const std = students[idx];

            const res = await axios.get("/admin/removeStudent/" + std._id)

            if(res.data.success){
                toast.success("Student removed")
                navigate(0);
            }
            else{
                toast.error("Deletion Failed")
            }
            
        } catch (error) {
            console.log("Student delete error")
            console.log(error);

            toast.error("Something went Wrong")
        }
    }

    const removeTeacher = async (idx) => {
        try {
            
            const teach = teachers[idx];

            const res = await axios.get("/admin/removeTeacher/" + teach.email)

            if(res.data.success){
                toast.success("Teacher removed")
                navigate(0);
            }
            else{
                toast.error("Deletion Failed")
            }
            
        } catch (error) {
            console.log("Student delete error")
            console.log(error);

            toast.error("Something went Wrong")
        }
    }

    const removeCourses = async (idx) => {
        try {
            
            const crs = courses[idx];

            const res = await axios.get("/admin/removeCourse/" + crs._id)

            if(res.data.success){
                toast.success("Course Removed")
                navigate(0);
            }
            else{
                toast.error("Deletion Failed")
            }
            
        } catch (error) {
            console.log("Student delete error")
            console.log(error);

            toast.error("Something went Wrong")
        }
    }

    const removeAdmin = async (idx) => {
        try {
            
            const adm = admins[idx];

            const res = await axios.post("/admin/remove",{
                id:adm._id
            })

            if(res.data.success){
                toast.success("Admin removed")
                navigate(0);
            }
            else{
                toast.error("Deletion Failed")
            }
            
        } catch (error) {
            console.log("Student delete error")
            console.log(error);

            toast.error("Something went Wrong")
        }
    }

    const addAdmin = async (e) => {
        
        try {
            e.preventDefault();
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const pass = passRef.current.value;
            const adminPass = admPassRef.current.value;

            const res = await axios.post("/admin/add",{
                full_name: name,
                email: email,
                password: pass,
                admin_password: adminPass
            })

            console.log(res)

            if(res.data.success){
                toast.success("Admin added Successfully")
                closeModal();
                navigate(0);
            }
            else{
                toast.error("Operation Failed")
            }

            closeModal();
        } catch (error) {
            console.log("Add admin Error")
            console.log(error);
            toast.error("Invalid Credentials")
            closeModal();
        }
    }

    const showCoursesHandler = async () => {
        try {
            
            setColumns(courseColumns);
            setTableData({
                field: "courses",
                data: courses
            });
            
            // searchRef.current.value = "";
        } catch (error) {
            console.log("Error = " + error);
        }
    }

    const showStudentsHandler = async () => {
        try {
            
            setColumns(studentColumns)
            setTableData({
                field: "students",
                data: students
            })
            
            // searchRef.current.value = "";
        } catch (error) {
            console.log(error)
        }
    }

    const showTeachersHandler = async () => {
        try {
            
            setColumns(teacherColumns)
            setTableData({
                field: "teachers",
                data: teachers
            })
            // searchRef.current.value = "";
        } catch (error) {
            console.log(error)
        }
    }

    const showAdminsHandler = async () => {
        try {
            
            setColumns(adminColumns)
            setTableData({
                field: "admins",
                data: admins
            })
            
            // searchRef.current.value = ""
        } catch (error) {
            console.log(error);
        }
    }

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    // Search

    const searchStd = async (val) => {
        
        const sdb = await studentDb;
        
        const res = await search(sdb,{
            term: `${val}`,
            properties: ["name","email","roll_number"]
        })

        setTableData({
            ...tableData,
            data: res.hits.map((hit) => hit.document)
        })
    }

    const searchTeach = async (val) => {
        
        const db = await teachersDb;

        const res = await search(db,{
            term: `${val}`,
            properties: ["name","email"]
        })

        // console.log("Search Res = ");
        // console.log(res.hits)

        setTableData({
            ...tableData,
            data: res.hits.map((hit) => hit.document)
        })
    }

    const searchAdmin = async (val) => {
        
        const db = await adminDb;

        const res = await search(db,{
            term: `${val}`,
            properties: ["name","email"]
        })

        // console.log("Search Res = ");
        // console.log(res.hits)

        setTableData({
            ...tableData,
            data: res.hits.map((hit) => hit.document)
        })
    }

    const searchCrs = async (val) => {
        
        const db = await courseDb;

        const res = await search(db,{
            term: `${val}`,
            properties: ["name"]
        })

        // console.log("Search Res = ");
        // console.log(res.hits);

        setTableData({
            ...tableData,
            data: res.hits.map((hit) => hit.document)
        })
    }

    const searchChangeHandler = () => {

        const searchVal = searchRef.current.value;

        // console.log(searchVal);

        if(searchVal.trim().length > 0){
            if(tableData.field === "courses"){
                searchCrs(searchVal.trim());                
            }
            if(tableData.field === "students"){
                searchStd(searchVal.trim())
            }
            if(tableData.field === "teachers"){
                searchTeach(searchVal.trim())
            }
            if(tableData.field === "admins"){
                searchAdmin(searchVal.trim())
            }
        }
        else{
            if(tableData.field === "courses"){
                setTableData({
                    ...tableData,
                    data: courses
                })
            }
            if(tableData.field === "students"){
                setTableData({
                    ...tableData,
                    data: students
                })
            }
            if(tableData.field === "teachers"){
                setTableData({
                    ...tableData,
                    data: teachers
                })
            }
            if(tableData.field === "admins"){
                setTableData({
                    ...tableData,
                    data: admins
                })
            }
        }
    }

    return (
        <div>
            <Dashboard>
                {showModal && 
                    <Modal closeModal = {closeModal}>
                        <form className = {classes.form} onSubmit = {addAdmin}>
                            <div className = {classes.input}>
                                <label htmlFor="full_name">Full Name: </label>
                                <input ref = {nameRef} type="text" id="full_name" required/>
                            </div>
                            <div className = {classes.input}>
                                <label htmlFor="email">Email: </label>
                                <input ref = {emailRef} type="email" id="email" required/>
                            </div>
                            <div className = {classes.input}>
                                <label htmlFor="password">Password: </label>
                                <input ref = {passRef} type="password" id="password" required/>
                            </div>
                            <div className = {classes.input}>
                                <label htmlFor="admin_passowrd">Admin Passowrd: </label>
                                <input ref = {admPassRef} type="password" id="admin_passowrd" required/>
                            </div>

                            <button type="submit">Add Admin</button>
                        </form>
                    </Modal>
                }
                <Card>
                    {/* Buttons */}
                    <div className = {classes.adminActions}>
                        <button onClick = {openModal}>Add new admin</button>
                    </div>

                    {/* Summary */}
                    <div className = {classes.summary}>
                        <div className={classes["card"]}>
                            <p>Number of Students</p>
                            <p>{students.length}</p>
                        </div>
                        <div className={classes["card"]}>
                            <p>Number of Teachers</p>
                            <p>{teachers.length}</p>
                        </div>
                        <div className={classes["card"]}>
                            <p>Number of Courses</p>
                            <p>{courses.length}</p>
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
                        {(columns.length !== 0) && <div className = {classes.searchBar}>
                            <i className ="fa-solid fa-magnifying-glass"></i>
                            <input type="text" ref = {searchRef} onChange = {searchChangeHandler}/>
                        </div>}
                        <div className={classes["content"]}>
                            {(columns !== [])? <Tables data = {tableData.data} columns = {columns}/>: <h2>Loading...</h2>}
                        </div>
                    </div>
                </Card>
            </Dashboard>
        </div>
    )
}

export default AdminDashboard