import React from "react";
import classes from "./AddStudentModal.module.css"

export default function AddStudentModal(){
    return (
        <div className={classes.modal}>
        <div className={classes.StudentName}>
            <label for="ClassName">Student Name</label>
            <input type="text" name="ClassName" ></input>
        </div>
        <div className={classes.submit}>
            <button>Submit</button>
        </div>
        </div>
    )
}