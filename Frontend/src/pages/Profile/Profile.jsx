import React, {useRef,useState} from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadingActions } from '../../store/loadingSlice'
import { userActions } from '../../store/userSlice'
import toast from "react-hot-toast"
import axios from "axios"
// import {URL} from "../../constants/backend"

import Dashboard from '../../components/Dashboard/Dashboard'

import classes from "./Profile.module.css"

function Profile() {

    const email_ref=useRef();
    const pass_ref=useRef();
    const name_ref = useRef();
    const rpass_ref = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    
    const [inpVal,setVal]=useState({
        email: user.email,
        pass:"",
        name: user.name,
        rpass: ""
    });

    const [inpValid,setInpValid]=useState({
        email:true,
        pass:false,
        name: true,
        rpass: false
    });

    const checkName = (event) => {

        setVal({
            ...inpVal,
            name: name_ref.current_value
        })

        let currName = name_ref.current.value;

        if(currName === ""){
            setInpValid({
                ...inpValid,
                name: false
            })
            console.log("Invalid");
            console.log(inpValid);
        }
        else{
            setInpValid({
                ...inpValid,
                name: true
            }) 
        }
    }

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

        if(currVal.length < 4 || currVal.length > 8){
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
    
    const checkRPass = () => {
        setVal({
            ...inpVal,
            rpass:rpass_ref.current.value
        })

        let currVal= rpass_ref.current.value

        if(currVal !== inpVal.pass){
            setInpValid({
                ...inpValid,
                rpass:false
            });
        }
        else{
            setInpValid({
                ...inpValid,
                rpass:true
            });
        }
    }

    const submitHandler = async (e)=>{
        try{
            e.preventDefault();

            if(!inpValid.email || !inpValid.pass || !inpValid.name || !inpValid.rpass){

                toast("Please fill the form correctly")
                return;
            }

            dispatch(loadingActions.showLoading())

            const userObj = {
                email: user.email,
                full_name: inpVal.name,
                curr_password: user.password,
                new_password: inpVal.pass,
                cn_password: inpVal.rpass,
            }

            const res = await axios.post("/user/update",userObj);

            dispatch(loadingActions.hideLoading());
            
            if(res.data.success){
                toast.success(res.data.message)
                dispatch(userActions.setUser(res.data.data))
                navigate("/profile")
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
        <Dashboard>
            <div className = {classes.profile}>
                <form className = {classes.form} onSubmit = {submitHandler}>
                    <div className={classes.txt_field}>  
                        <input ref={name_ref} onChange={checkName} value={inpVal.name} className={`${inpValid.name?classes.right:classes.wrong}`} type="text" required/>
                        <label>Name</label>
                    </div>

                    <div className={classes.txt_field}>  
                        <input ref={email_ref} onChange={checkEmail} value={inpVal.email} className={`${inpValid.email?classes.right:classes.wrong}`} type="text" required/>
                        <label>Email</label>
                        {emailErr()}
                    </div>

                    <div className={classes.txt_field}>  
                        <input ref={pass_ref} onChange={checkPass} value={inpVal.pass} className={`${inpValid.pass?classes.right:classes.wrong}`} type="password" required/>
                        <label>Password</label>
                    </div>

                    <div className={classes.txt_field}>  
                        <input ref={rpass_ref} onChange={checkRPass} value={inpVal.rpass} className={`${inpValid.rpass?classes.right:classes.wrong}`} type="password" required/>
                        <label>Re-enter Password</label>
                    </div>

                    <input className = {classes.submit} type="submit" value="Update" />

                </form>
            </div>
        </Dashboard>
    )
}

export default Profile