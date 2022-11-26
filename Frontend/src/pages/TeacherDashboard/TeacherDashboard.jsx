import {useEffect,useState} from "react"
import axios from "axios"
import { useSelector,useDispatch } from "react-redux";
import QrReader from "react-qr-scanner"

import { loadingActions } from "../../store/loadingSlice";
import Dashboard from '../../components/Dashboard/Dashboard'
import Card from "../../components/TeacherCard/TeacherCard";
import teacher from "./TeacherDashboard.module.css";
import Modal from "../../components/Modal/Modal";
import AddClassModal from "../../components/AddClassModal/AddClassModal"
import AddStudentModal from "../../components/AddStudentModal/AddStudentModal"
import AddTeacherModal from "../../components/AddTeacherModal/AddTeacherModal"
import classes from "./TeacherDashboard.module.css"

// import {teacherClasses} from "../../constants/TeacherClasses"


export default function TeacherDashboard() {

    const [showQr,setShowQr] = useState(false);
    const [qrRes,setQrRes] = useState("");
    const [scan,setScan] = useState(false)

    const user = useSelector(state => state.user.user)
    const [teachClasses,setTeachClasses] = useState([])
    const [stateAddClass,setstateAddClass]=useState({
        display:false
    });
    const [stateAddTeacher,setstateAddTeacher]=useState({
        display:false
    });
    const [stateAddStudent,setstateAddStudent]=useState({
        display:false
    });
    const dispatch = useDispatch();

    const getClasses = async () => {
        try {
            dispatch(loadingActions.showLoading())
            const res = await axios.get("/api/getClasses")
            dispatch(loadingActions.hideLoading());

            // console.log(res.data);
            const temp = res.data.data.filter((cls) => {
                let ret = false;
                cls.teachers.forEach((std) => {
                    // console.log(`std = ${std.roll_number}`);
                    if(std.email === user.email){
                        ret = true;
                    }
                })
                return ret;
            })

            setTeachClasses(temp)
        } catch (error) {
            dispatch(loadingActions.hideLoading())
            console.log("Error in fetching Classes:");
            console.log(error)
        }
    }

    useEffect(() => {
        getClasses();
    },[]);

    const getQrCode = () => {
        console.log("QR Code button clicked");
    }

    const seeAtt = () => {
        console.log("temp");
    }


    function AddClassModalFunc(){
        if(stateAddClass.display){
            return (
                <Modal closeModal = {closeAddClassModal}>
                    <AddClassModal/>
                </Modal>
            )
        }
    }

    function modalAddClass(){
        
        setstateAddClass({
            ...stateAddClass,
            display:true
        })
    }

    function closeAddClassModal(){
        setstateAddClass({
            ...stateAddClass,
            display:false
        })
    }

    function addStudentModal(){

        setstateAddStudent({
            ...stateAddStudent,
            display:true
        })
    }

    function AddStudentModalFunc(){
        if(stateAddStudent.display){
            return (
                <Modal closeModal = {closeAddStudentModal}>
                    <AddStudentModal/>
                </Modal>
            )
        }
    }

    function closeAddStudentModal(){
        setstateAddStudent({
            ...stateAddStudent,
            display:false
        })
    }


    function addTeacherModal(){
        
        setstateAddTeacher({
            ...stateAddTeacher,
            display:true
        })
    }

    function AddTeacherModalFunc(){
        if(stateAddTeacher.display){
            return (
                <Modal closeModal = {closeAddTeacherModal}>
                    <AddTeacherModal/>
                </Modal>
            )
        }
    }

    function closeAddTeacherModal(){
        setstateAddTeacher({
            ...stateAddTeacher,
            display:false
        })
    }

    function removeCurrClass(){
        
    }

    const onError = () => {
        setQrRes( "Error ❌")
    }

    let prevText = qrRes;

    const onScan = (data) => {

        if(data !== null && prevText !== data.text){
            prevText = data.text;

            if(data.text.includes("%%")){
                let rollNo = data.text.split("%%")[0];
                console.log(rollNo)
                setQrRes(rollNo + " ✅")
            }
            else{
                setQrRes("Invalid QR 😕")
            }
        }

    }

    const closeQr = () => {
        setShowQr(false);
        stopScan();
        setQrRes("");
    }

    const scanQR = () => {
        setShowQr(true);
    }

    const startScan = () => {
        // console.log("start Scan");
        setScan(true);
    }

    const stopScan = () => {
        setScan(false);
    }
    
    return (
        <Dashboard >

            {showQr && 
                <Modal closeModal = {closeQr}> 
                    {scan && 
                        <>
                            <p className = {classes.qrResult}>Result : {qrRes}</p>    
                            <QrReader
                            onScan = {onScan}
                            onError = {onError}
                            style = {{
                                height: 400,
                                width: 550
                            }}
                            />
                        </>
                    }
                    {scan && <button className = {classes.qrButton} onClick = {stopScan}>Stop Scan</button>}
                    {!scan && <button className = {classes.qrButton} onClick = {startScan}>Start Scan</button>}
                </Modal>
            }

            {AddClassModalFunc()}
            {AddStudentModalFunc()}
            {AddTeacherModalFunc()}
            <div className={teacher.addclass}>
                <button onClick={modalAddClass}>Add New Class</button>
            </div>
            <div className={teacher.classes}>
                {teachClasses.map(c => {
                    return (
                        <Card 
                            key={c._id}
                            title={c.name}
                            teacher={c.email}  
                            scanQR ={scanQR} 
                            seeAtt={seeAtt}
                            addStudent={addStudentModal} 
                            addTeacher={addTeacherModal}
                            removeClass={removeCurrClass} 
                         />
                    )
                })}
            </div>
            {/* teacherClasses.map(class => ) */}
        </Dashboard>    
        
    )
}