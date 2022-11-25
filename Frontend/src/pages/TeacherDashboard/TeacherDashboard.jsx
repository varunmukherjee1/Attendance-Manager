import {useEffect,useState} from "react"
import axios from "axios"
import { useSelector,useDispatch } from "react-redux";

import { loadingActions } from "../../store/loadingSlice";
import Dashboard from '../../components/Dashboard/Dashboard'
import Card from "../../components/TeacherCard/TeacherCard";
import teacher from "./TeacherDashboard.module.css";
import Modal from "../../components/Modal/Modal";
import AddClassModal from "../../components/AddClassModal/AddClassModal"
import AddStudentModal from "../../components/AddStudentModal/AddStudentModal"
import AddTeacherModal from "../../components/AddTeacherModal/AddTeacherModal"

// import {teacherClasses} from "../../constants/TeacherClasses"


export default function TeacherDashboard() {

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
    
    return (
        <Dashboard >
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
                        qrCode={getQrCode} 
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