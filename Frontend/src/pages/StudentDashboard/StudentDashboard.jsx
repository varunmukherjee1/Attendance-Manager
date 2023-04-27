import { useEffect, useState } from 'react';
import axios from "axios"
import {useSelector , useDispatch } from 'react-redux';
import {loadingActions} from "../../store/loadingSlice"
import QRCode from "react-qr-code";
// import {URL} from "../../constants/backend"

import Dashboard from '../../components/Dashboard/Dashboard'
import Card from "../../components/StudentCard/StudentCard";
import student from "./StudentDashboard.module.css";
import Modal from '../../components/Modal/Modal';
// import {studentsClasses} from "../../constants/StudentClasses"


export default function StudentDashboard() {

    const [stdClasses,setStdClasses] = useState([]);
    const [showQR,setShowQr] = useState({
        show: false,
        qr: undefined
    })
    
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    
    const getClasses = async () => {
        try {
            dispatch(loadingActions.showLoading())
            const res = await axios.get("/api/getClasses", {
                withCredentials: true
            })
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

    // console.log(stdClasses);
    
    const getQrCode = (id) => {
        // console.log(user)

        let qrString;

        console.log(id)
        
        stdClasses.forEach((cls) => {
            cls.students.forEach((std) => {
                if(std.roll_number === user.roll_number && cls._id === id){
                    qrString =  std.qrcode_string;
                }
            })
        });

        // console.log(qrString);
        setShowQr({
            show: true,
            qr: qrString
        })
    }

    const seeAtt = () => {
        console.log("temp");
    }

    const closeModal = () => {
        setShowQr({
            show: false,
            qr: ""
        })
    }

    useEffect(() => {
        getClasses();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <Dashboard>
            <div className={student.classes}>
                {showQR.show && 
                    <Modal closeModal = {closeModal}>
                        {(showQR.qr) ? <QRCode value = {showQR.qr}/> :
                            <h2>QR Not Found! 😕</h2>
                        }
                        {/* <h3>{showQR.qr}</h3> */}
                    </Modal>
                }
                {stdClasses.map(c => {
                    // setCurrentClass(c._id)
                    return (
                        <Card classId={c._id} key={c._id} title={c.name} teacher={c.teachers[0].email}  qrCode={getQrCode} seeAtt={seeAtt}/>
                    )
                })}
            </div>
            {/* studentsClasses.map(class => ) */}
        </Dashboard>    
    )
}