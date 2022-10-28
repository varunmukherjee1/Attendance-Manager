import React,{useState,useRef} from "react";
import classes from "./Login.module.css"

const Login=()=>{

    const email_ref=useRef();
    const pass_ref=useRef();
    
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

    const submitHandler=(e)=>{
        e.preventDefault();
        // const email=email_ref.current.value;
        // const pass=pass_ref.current.value;

        // const user={
        //     email,
        //     pass
        // }      
        
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
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.txt_field}>  
                    <input ref={email_ref} onChange={checkEmail} value={inpVal.email} className={`${inpValid.email?classes.right:classes.wrong}`} type="text" required/>
                    <label>Email</label>
                    {emailErr()}
                </div>
                <div className={classes.txt_field}>  
                    <input ref={pass_ref} onChange={checkPass} value={inpVal.pass} className={`${inpValid.pass?classes.right:classes.wrong}`} type="password" onc required/>
                    <label>Password</label>
                </div>
                <div className={classes.pass}>Forgot Password</div>
                <input type="submit" value="Login" />
                <div className={classes.signup_link}>
                   Not a member?<a href="/register"> Register</a>
                </div>

            </form>
        </div>
    )
}

export default Login