import {useEffect,useState} from "react"
import axios from "axios"
import { useSelector,useDispatch } from "react-redux";

import { loadingActions } from "../../store/loadingSlice";
import Dashboard from '../../components/Dashboard/Dashboard'
import Card from "../../components/TeacherCard/TeacherCard";
import teacher from "./TeacherDashboard.module.css";
// import {teacherClasses} from "../../constants/TeacherClasses"


export default function TeacherDashboard() {

    const user = useSelector(state => state.user.user)
    const [teachClasses,setTeachClasses] = useState([])
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
    
    return (
        <Dashboard>
            <div>
                <button>Add New Class</button>
            </div>
            <div className={teacher.classes}>
                {teachClasses.map(c => {
                    return (
                        <Card key={c._id} title={c.name} teacher={c.email}  qrCode={getQrCode} seeAtt={seeAtt}/>
                    )
                })}
            </div>
            {/* teacherClasses.map(class => ) */}
        </Dashboard>    
    )
}