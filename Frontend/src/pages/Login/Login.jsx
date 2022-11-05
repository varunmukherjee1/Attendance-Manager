import React,{useState,useRef} from "react";
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate , Link} from "react-router-dom";
import {useDispatch} from "react-redux"

import {loadingActions} from "../../store/loadingSlice"
import {userActions} from "../../store/userSlice"

import classes from "./Login.module.css"

const Login=()=>{

    const dispatch = useDispatch();

    const email_ref=useRef();
    const pass_ref=useRef();
    const navigate = useNavigate();
    
    const [inpVal,setVal]=useState({
        email:"",
        pass:""
    });
    const [inpValid,setInpValid]=useState({
        email:false,
        pass:false
    });

    const checkEmail = (event)=>{
        setVal({
            ...inpVal,
            email:email_ref.current.value
        })
        let currVal=email_ref.current.value
        if( !currVal.includes("@iiits.in")){
            setInpValid({
                ...inpValid,
                email:false
            });
        }
        else{
            setInpValid({
                ...inpValid,
                email:true
            });
        }
    }

    const checkPass=(event)=>{
        setVal({
            ...inpVal,
            pass:pass_ref.current.value
        })
        let currVal=pass_ref.current.value
        if(currVal.length===0){
            setInpValid({
                ...inpValid,
                pass:false
            });
        }
        else{
            setInpValid({
                ...inpValid,
                pass:true
            });
        }
    }

    const submitHandler= async (e)=>{
        try{
            e.preventDefault();

            if(!inpValid.email || !inpValid.pass){

                toast("Please fill the form correctly")
                return;
            }

            const email = inpVal.email;
            const password = inpVal.pass;

            dispatch(loadingActions.showLoading())

            const res = await axios.post("user/login",{
                email,
                password,
            });

            dispatch(loadingActions.hideLoading());
            
            if(res.data.success){
                toast.success(res.data.message)
                dispatch(userActions.setUser(res.data.data))
                navigate("/")
            }
            else{
                toast.error(res.data.message)
            }

        }
        catch(err){
            console.log("Error = " + err)
            dispatch(loadingActions.hideLoading());
            toast.error("Something went wrong!")
        }        
    }

    let emailErr = ()=>{
        if(inpVal.email.includes('@') && !inpVal.email.includes('@iiits.in')){
            return (<p>Only iiits.in domain allowed</p>)
        }
        else if(!inpVal.email.includes('@') && inpVal.email.length!==0){
            return (<p>Invalid Email Format</p>)
        }
    }

    return (
        <div className={classes.center}>
            <form onSubmit={submitHandler}>
            <h1>Login</h1>
                <div className={classes.txt_field}>  
                    <input ref={email_ref} onChange={checkEmail} value={inpVal.email} className={`${inpValid.email?classes.right:classes.wrong}`} type="text" required/>
                    <label>Email</label>
                    {emailErr()}
                </div>
                <div className={classes.txt_field}>  
                    <input ref={pass_ref} onChange={checkPass} value={inpVal.pass} className={`${inpValid.pass?classes.right:classes.wrong}`} type="password" required/>
                    <label>Password</label>
                </div>
                <div className={classes.pass}>Forgot Password</div>
                <input type="submit" value="Login" />
                <div className={classes.signup_link}>
                   Not a member?<Link to ="/register"> Register</Link>
                </div>

            </form>
        </div>
    )
}

export default Login