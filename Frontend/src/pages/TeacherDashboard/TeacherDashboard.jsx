import Dashboard from '../../components/Dashboard/Dashboard'
import Card from "../../components/TeacherCard/TeacherCard";
import teacher from "./TeacherDashboard.module.css";
import {teacherClasses} from "../../constants/TeacherClasses"


export default function TeacherDashboard() {

    const getQrCode = () => {
        console.log("QR Code button clicked");
    }

    const seeAtt = () => {
        console.log("temp");
    }
    
    return (
        <Dashboard>
            <div className={teacher.classes}>
                {teacherClasses.map(c => {
                    return (
                        <Card key={c.title} src={c.src} title={c.title} teacher={c.teacher}  qrCode={getQrCode} seeAtt={seeAtt}/>
                    )
                })}
            </div>
            {/* teacherClasses.map(class => ) */}
        </Dashboard>    
    )
}