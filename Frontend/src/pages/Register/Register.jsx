import React,{useRef,useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"

import classes from "./Register.module.css"

const Register=(props)=>{

    const full_name_ref=useRef();
    const email_ref=useRef();
    const type_ref=useRef();
    const roll_ref=useRef();
    const pass_ref=useRef();
    const c_pass_ref=useRef();

    const navigate = useNavigate();

    const [inpVal,setval]=useState({
        name:"",
        email:"",
        type:"Student",
        roll:"",
        pass:"",
        c_pass:""
    });
    const [inpValid,setInpValid]=useState({
        name:false,
        email:false,
        type:true,
        roll:false,
        pass:false,
        c_pass:false
    });



    const checkName=(event)=>{
        setval({
            ...inpVal,
            name:full_name_ref.current.value
        })
        let currVal=full_name_ref.current.value
        if(currVal.length===0){
            setInpValid({
                ...inpValid,
                name:false
            });
        }
        else{
            setInpValid({
                ...inpValid,
                name:true
            });
        }
    }

    const checkEmail=(event)=>{
        setval({
            ...inpVal,
            email:email_ref.current.value
        })
        let currVal=email_ref.current.value
        if(currVal.length===0 || !currVal.includes("@iiits.in")){
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

    const checkType=(event)=>{
        setval({
            ...inpVal,
            type:type_ref.current.value
        })
        let currVal=type_ref.current.value
        if(currVal==="Teacher"){
            setInpValid({
                ...inpValid,
                type:false
            });
        }
        else{
            setInpValid({
                ...inpValid,
                type:true
            });
        }
    }

    const checkRoll=(event)=>{
        setval({
            ...inpVal,
            roll:roll_ref.current.value
        })
        let currVal=roll_ref.current.value
        if(currVal.length===0){
            setInpValid({
                ...inpValid,
                roll:false
            });
        }
        else{
            setInpValid({
                ...inpValid,
                roll:true
            });
        }
    }

    const checkPass=(event)=>{
        setval({
            ...inpVal,
            pass:pass_ref.current.value
        })
        let currVal=pass_ref.current.value
        if( currVal.length<4 || currVal.length>8){
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

    const checkConfPass=(event)=>{
        setval({
            ...inpVal,
            c_pass:c_pass_ref.current.value
        })
        let currVal=c_pass_ref.current.value
        let currPassVal=pass_ref.current.value
        if( currVal!==currPassVal){
            setInpValid({
                ...inpValid,
                c_pass:false
            });
        }
        else{
            setInpValid({
                ...inpValid,
                c_pass:true
            });
        }
    }
    
    const submitHandler= async (e)=>{
        
        try{
            e.preventDefault();
            // console.log(inpValid);

            if(!inpValid.name || (inpVal.type === "Student" && !inpValid.roll) || !inpValid.email || !inpValid.pass || !inpValid.c_pass){

                toast("Please fill the form correctly")
                return;
            }

            const full_name = inpVal.name;
            const roll_number = inpVal.roll;
            const email = inpVal.email;
            const password = inpVal.pass;
            const user_type = inpVal.type;

            const res = await axios.post("user/register",{
                full_name,
                roll_number,
                email,
                password,
                user_type
            });

            

            if(res.data.success){
                toast.success(res.data.message)
                navigate("/login")
            }
            else{
                toast.error(res.data.message)
            }
        }
        catch(err){
            console.log("Error = " + err)
            toast.error("Something went wrong!")
        }        
        
    }
    
    let fullnameerr=()=>{
        if(inpVal.name.length===0){
            return (<p>*Mandatory Field</p>)
        }
    }
    
    let emailerr=()=>{
        if(inpVal.email.length===0){
            return (<p>*Mandatory Field</p>)
        } 
        else if(inpVal.email.includes('@') && !inpVal.email.includes('@iiits.in')){
            return (<p>Only iiits.in domain allowed</p>)
        }
        else if(!inpVal.email.includes('@') && inpVal.email.length!==0){
            return (<p>Invalid Email Format</p>)
        }
    }

    let rollerr=()=>{
        if(inpVal.roll.length===0){
            return (<p>*Mandatory Field</p>)
        }
    }
    
    let passerr=()=>{
        if(inpVal.pass.length===0){
            return (<p>*Mandatory Field</p>)
        }
        else if(inpVal.pass.length<4 || inpVal.pass.length>10){
            return (<p>Password length should be more than 4 and less than 10 characters</p>)
        }
    }

    let confpasserr=()=>{
        if(inpVal.c_pass!==inpVal.pass){
            return (<p>Password Not Matched</p>)
        }
    }


    return (
        <div className={classes.Form}>
            <form onSubmit={submitHandler} >
            <h1>Register</h1>
                <div className={classes.text_field}>
                    <label>Full Name</label>
                    <input  ref={full_name_ref} onChange={checkName} type="text" className={`${inpValid.name?classes.right:classes.wrong}`} value={inpVal.name} id="full_name" />
                    {fullnameerr()}
                </div>
                <div className={classes.text_field}>
                    <label>Email</label>
                    <input ref={email_ref} type="text" onChange={checkEmail} className={`${inpValid.email?classes.right:classes.wrong}`} value={inpVal.email} name="email" id="email" />
                    {emailerr()}
                </div>
                <div  className={`${classes.text_field} `}>
                <label htmlFor="Type">Type : </label>
                <select ref={type_ref} onChange={checkType} onInput={checkType} value={inpVal.type} className={`${inpValid.type?"text_field":""}`} id="usrType" name="user_type">
                    <option value="Student" selected> Student</option>
                    <option value="Teacher"> Teacher</option>
                </select>
                </div>
                {(inpVal.type === "Student") &&
                    <div className={classes.text_field}>
                        <label>Roll Number</label>
                        <input ref={roll_ref} onChange={checkRoll} value={inpVal.roll} className={`${inpValid.roll?classes.right:classes.wrong}`} type="text" name="roll" id="roll" />
                        {rollerr()}
                    </div>
                }
                <div className={classes.text_field}>
                    <label>Password</label>
                    <input ref={pass_ref} type="password" onChange={checkPass} className={`${inpValid.pass?classes.right:classes.wrong}`}  id="passw" value={inpVal.pass} />
                    {passerr()}
                </div>
                <div className={classes.text_field}>
                    <label>Confirm Password</label>
                    <input ref={c_pass_ref} type="password" onChange={checkConfPass}  id="conf_pass" className={`${inpValid.c_pass?classes.right:classes.wrong}`} value={inpVal.c_pass} />
                    {confpasserr()}
                </div>
                <div className={classes.pass}>Forgot Password</div>
                <input type="submit" value="Register" />   
                <div className={classes.signup_link}>
                Already Registered? <a href="/login">Login</a>
                </div>
            </form>
        </div>
    )
}

export default Register