import {useEffect,useState} from "react"
import axios from "axios"
import { useSelector,useDispatch } from "react-redux";
import QrReader from "react-qr-scanner"
import toast from "react-hot-toast"
// import {URL} from "../../constants/backend"

import { loadingActions } from "../../store/loadingSlice";
import Dashboard from '../../components/Dashboard/Dashboard'
import Card from "../../components/TeacherCard/TeacherCard";
import teacher from "./TeacherDashboard.module.css";
import Modal from "../../components/Modal/Modal";
import AddClassModal from "../../components/AddClassModal/AddClassModal"
import classes from "./TeacherDashboard.module.css"

export default function TeacherDashboard() {

    const [showQr,setShowQr] = useState(false);
    const [qrRes,setQrRes] = useState("");
    const [scan,setScan] = useState(false)
    const [attendance,setAttendance] = useState()

    const user = useSelector(state => state.user.user)
    const [teachClasses,setTeachClasses] = useState([])
    const [stateAddClass,setstateAddClass]=useState({
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
    },[]); // eslint-disable-line react-hooks/exhaustive-deps


    function AddClassModalFunc(){
        if(stateAddClass.display){
            return (
                <Modal closeModal = {closeAddClassModal}>
                    <AddClassModal closeModal = {closeAddClassModal}/>
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

    const removeCurrClass = async (cid) => {
        const res = await axios.get("/auth/removeClass/" + cid)

        if(res.data.success){
            toast.success("Class removed successfully")
            getClasses();
        }
        else{
            toast.error(res.data.message)
        }

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

                const tempStr = attendance.qrString + data.text + ";;"
                setAttendance({
                    ...attendance,
                    qrString: tempStr,
                })
                setQrRes(rollNo + " ✅")
            }
            else{
                setQrRes("Invalid QR 😕")
            }
        }

    }

    const closeQr = async () => {

        try {
            
            const res = await axios.post("/auth/markAttendance/" + attendance.classId,{
                qrCodeArr: attendance.qrString
            })

            console.log(res);

            setShowQr(false);
            stopScan();
            setQrRes("");
            setAttendance();

        } catch (error) {
            console.log("Mark Attendace error")
            console.log(error);
        }
    }

    const scanQR = (id) => {
        setShowQr(true);
        setAttendance({
            classId: id,
            qrString: ""
        })
    }

    const startScan = (id) => {
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
            <div className={teacher.addclass}>
                <button onClick={modalAddClass}>Add New Class</button>
            </div>
            {AddClassModalFunc()}
            <div className={teacher.classes}>
                {teachClasses.map(c => {
                    return (
                        <Card 
                            key={c._id}
                            id={c._id}
                            title={c.name}
                            teacher={c.email}  
                            scanQR ={scanQR}
                            // addStudent={addStudentModal} 
                            // addTeacher={addTeacherModal}
                            removeClass={removeCurrClass} 
                         />
                    )
                })}
            </div>
            {/* teacherClasses.map(class => ) */}
        </Dashboard>    
        
    )
}