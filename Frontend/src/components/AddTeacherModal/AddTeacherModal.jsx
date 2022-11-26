import React from "react";
import classes from "./AddTeacherModal.module.css"

export default function AddTeacherModal(){
    return (
        <div className={classes.modal}>
        <div className={classes.teachername}>
            <label for="ClassName">Teacher Name</label>
            <input type="text" name="ClassName" ></input>
        </div>
        <div className={classes.submit}>
            <button>Submit</button>
        </div>
        </div>
    )
}