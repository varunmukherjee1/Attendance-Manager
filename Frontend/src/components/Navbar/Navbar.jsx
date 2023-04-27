import React from 'react'
import {Link , useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/userSlice'
import axios from "axios"
import toast from 'react-hot-toast'
// import {URL} from "../../constants/backend"

import classes from "./Navbar.module.css"

function Navbar(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {

        try{
            const res = await axios.get("/user/logout", {
                withCredentials: true
            })
            toast.success(res.data.message)
            dispatch(userActions.setUser(null))
            navigate("/")
        }
        catch(err){
            console.log("Logout Err:")
            console.log(err);
            toast.error("Something went wrong")
        }
    }


    return (
    <div className = {`${classes.navigation} ${props.isActive? classes.active: ""}`}>
            <ul>
                <li>
                    <Link to = "/">

                        <i className ="fa-brands fa-sketch"></i>
                        {/* <h2>Group 27</h2> */}
                    </Link>
                </li>
                <li>
                    <Link to = "/">
                        <span className = {classes.icon}>
                            <i className ="fa-solid fa-house"></i>
                        </span>
                        <span className = {classes.title}>Dashboard</span>
                    </Link>
                </li>

                <li>    
                    <Link to = "/profile">
                        <span className = {classes.icon}>
                            <i className ="fa-solid fa-user"></i>
                        </span>
                        <span className = {classes.title}>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link to = "/info">
                        <span className = {classes.icon}>
                            <i className ="fa-solid fa-gear"></i>
                        </span>
                        <span className = {classes.title}>Settings</span>
                    </Link>
                </li>
                <li>
                    <Link to = "/contactus">
                        <span className = {classes.icon}>
                            <i className ="fa-solid fa-question"></i>
                        </span>
                        <span className = {classes.title}>help</span>
                    </Link>
                </li>
                <li>
                    <Link to = "/aboutus">
                        <span className = {classes.icon}>
                            <i className="fa-solid fa-circle-info"></i>
                        </span>
                        <span className = {classes.title}>About us</span>
                    </Link>
                </li>
                <li>
                    <Link onClick = {logoutHandler}>
                        <span className = {classes.icon}>
                            <i className ="fa-solid fa-right-from-bracket"></i>
                        </span>
                        {/* <span className = {classes.title}>Sign Out</span> */}
                    </Link>
                </li>

            </ul>

        </div>
    )
}

export default Navbar