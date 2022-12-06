import React,{useRef} from "react";
import classes from "./AddTeacherModal.module.css"

export default function AddTeacherModal(props){

    const emailRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        props.addTeacher(emailRef.current.value);
    }

    return (
        <div className={classes.modal}>
        <form onSubmit = {submitHandler}>
            <div className={classes.teachername}>
                <label htmlFor="ClassName">Teacher Name</label>
                <input ref = {emailRef} type="email" name="ClassName" required></input>
            </div>
            <div className={classes.submit}>
                <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    )
}