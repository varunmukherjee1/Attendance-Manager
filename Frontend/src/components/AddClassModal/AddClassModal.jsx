import React from "react"
import classes from "./AddClassModal.module.css"


export default function  AddClassModal(){
    const addClass = async () => {
        console.log("Will add this functionality soon");
        // const res = await axios.post("/addClass", {})
        // console.log(res);
    }
    return (
        <div className={classes.modal}>
        <div className={classes.classname}>
            <label htmlFor="ClassName">Class Name</label>
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
            <button onClick={addClass}>Submit</button>
        </div>
        </div>
    )
}