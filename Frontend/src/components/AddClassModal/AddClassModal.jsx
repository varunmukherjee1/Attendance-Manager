import React from "react"
import classes from "./AddClassModal.module.css"


export default function  AddClassModal(){
    return (
        <div className={classes.modal}>
        <div className={classes.classname}>
            <label for="ClassName">Class Name</label>
            <input type="text" name="ClassName" ></input>
        </div>
        <div className={classes.AddStudents}>
            <label >Add Students</label>
            <input type="file" name="Files" accept='.csv'  />
        </div>
        <div className={classes.AddTeachers}>
            <label >Add Teachers</label>
            <input type="file" name="Files" accept='.csv'  />
        </div>
        <div className={classes.submit}>
            <button>Submit</button>
        </div>
        </div>
    )
}