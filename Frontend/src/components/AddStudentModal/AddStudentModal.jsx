import React,{useRef} from "react";
import classes from "./AddStudentModal.module.css"

export default function AddStudentModal(props){

    const emailRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        props.addStudent(emailRef.current.value);
    }

    return (
        <div className={classes.modal}>
            <form onSubmit={submitHandler}>
                <div className={classes.StudentName}>
                    <label htmlFor="ClassName">Student Email:</label>
                    <input ref = {emailRef} type="text" name="ClassName" required></input>
                </div>
                <div className={classes.submit}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}