import React,{useRef} from "react"
import axios from "axios";
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
// import {URL} from "../../constants/backend"

import classes from "./AddClassModal.module.css"


export default function  AddClassModal(props){

    const cnameRef = useRef();
    const stdRef = useRef();
    const teachRef = useRef();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const cname = cnameRef.current.value;
        const stds = stdRef.current.files[0];
        const teach = teachRef.current.files[0];

        let formData = new FormData();

        formData.append("className",cname)
        formData.append("students",stds)
        formData.append("teachers",teach)

        console.log({
            cname,
            stds,
            teach,
        });

        const res = await axios.post("/auth/addClass",formData,{
            headers : {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        })

        console.log("REs :-");
        console.log(res);

        if(res.data.success){
            toast.success(res.data.message)
            props.closeModal();
        }
        else{
            toast.error(res.data.message)
        }

        navigate("/")
        props.closeModal();
    }

    return (
        <div className={classes.modal}>
            {/* <form action = "/addClass" method="post" enctype="multipart/form-data"> */}
            <form onSubmit = {submitHandler}>
                <div className={classes.classname}>
                    <label htmlFor="ClassName">Class Name</label>
                    <input ref = {cnameRef} type="text" name="className" required/>
                </div>
                <div className={classes.AddStudents}>
                    <label >Add Students</label>
                    <input ref = {stdRef} type="file" accept='.csv'  name = "students"/>
                </div>
                <div className={classes.AddTeachers}>
                    <label >Add Teachers</label>
                    <input ref = {teachRef} type="file" accept='.csv' name = "teachers" />
                </div>
                <div className={classes.submit}>
                    <button type = "submit">Submit</button>
                </div>
            </form>
        </div>
    )
}