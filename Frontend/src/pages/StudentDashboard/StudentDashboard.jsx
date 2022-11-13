import { useEffect, useState } from 'react';
import axios from "axios"
import {useSelector , useDispatch } from 'react-redux';
import {loadingActions} from "../../store/loadingSlice"
import image from "../../assets/profile_pic.svg"

import Dashboard from '../../components/Dashboard/Dashboard'
import Card from "../../components/StudentCard/StudentCard";
import student from "./StudentDashboard.module.css";
import {studentsClasses} from "../../constants/StudentClasses"


export default function StudentDashboard() {

    const [stdClasses,setStdClasses] = useState([]);

    const getQrCode = () => {
        console.log("QR Code button clicked");
    }

    const seeAtt = () => {
        console.log("temp");
    }

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();

    const getClasses = async () => {
        try {
            dispatch(loadingActions.showLoading())
            const res = await axios.get("/api/getClasses")
            dispatch(loadingActions.hideLoading());

            // console.log(res.data);
            const temp = res.data.data.filter((cls) => {
                let ret = false;
                cls.students.forEach((std) => {
                    // console.log(`std = ${std.roll_number}`);
                    if(std.roll_number === user.roll_number){
                        ret = true;
                    }
                })
                return ret;
            })

            setStdClasses(temp)
        } catch (error) {
            dispatch(loadingActions.hideLoading())
            console.log("Error in fetching Classes:");
            console.log(error)
        }
    }

    useEffect(() => {
        getClasses();
    },[]);

    // console.log(stdClasses);
    
    return (
        <Dashboard>
            <div className={student.classes}>
                {stdClasses.map(c => {
                    return (
                        <Card key={c._id} src={image} title={c.name} teacher={c.teachers[0].email}  qrCode={getQrCode} seeAtt={seeAtt}/>
                    )
                })}
            </div>
            {/* studentsClasses.map(class => ) */}
        </Dashboard>    
    )
}