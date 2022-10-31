import React,{useState,useRef} from "react";
import axios from "axios"
import toast from "react-hot-toast"
import emailjs from 'emailjs-com'

import classes from "./ContactUs.module.css"

function ContactUs(){

    const name_ref=useRef();
    const email_ref=useRef();
    const msg_ref=useRef();
    
    const [inpVal,setVal]=useState({
        name:"",
        email:"",
        msg:""
    });
    const [inpValid,setInpValid]=useState({
        name:false,
        email:false,
        msg:true
    });


    const checkName=(event)=>{
        setVal({
            ...inpVal,
            name:name_ref.current.value
        })
        let currVal=name_ref.current.value
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

    

    const submitHandler= (e)=>{
        e.preventDefault();
        
        emailjs.sendForm('service_6jfle0d'
                        ,'template_kwwcd26'
                        ,e.target
                        ,'y0QX3dxR2aK11i4v4'
                        )
                        .then(res =>{
                            name_ref.current.value = "";
                            email_ref.current.value = "";
                            msg_ref.current.value = "";

                            toast.success("We will contact you soon")
                        })
                        .catch(err=>{
                            console.log(err)

                            toast.error("Something went wrong !")
                        });

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
        <div className={classes.Form}>
            <form onSubmit={submitHandler}>
            <h1>Contact Us</h1>
                <div className={classes.text_field}>  
                    <label>Name</label>
                    <input ref={name_ref} onChange={checkName} value={inpVal.name} name="name" className={`${inpValid.name?classes.right:classes.wrong}`} type="text" required/>
                </div>
                <div className={classes.text_field}>  
                    <label>Email</label>
                    <input ref={email_ref} name="user_email" onChange={checkEmail} value={inpVal.email} className={`${inpValid.email?classes.right:classes.wrong}`} type="text" required/>
                    {emailErr()}
                </div>
                <div className={classes.text_field}>  
                    <label>Message</label>
                    <textarea ref={msg_ref} name="message" value={inpVal.pass} className={`${classes.txt_field}`} type="text" rows='2'  required/>
                </div>
                
                <input type="submit" value="Send" />
            </form>
        </div>
    )
}

export default ContactUs