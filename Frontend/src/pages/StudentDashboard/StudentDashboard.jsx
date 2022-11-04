import Dashboard from '../../components/Dashboard/Dashboard'
import Card from "../../components/StudentCard/StudentCard";
import student from "./StudentDashboard.module.css";
import {studentsClasses} from "../../constants/StudentClasses"


export default function StudentDashboard() {

    const getQrCode = () => {
        console.log("QR Code button clicked");
    }

    const seeAtt = () => {
        console.log("temp");
    }
    
    return (
        <Dashboard>
            <div className={student.classes}>
                {studentsClasses.map(c => {
                    return (
                        <Card key={c.title} src={c.src} title={c.title} teacher={c.teacher}  qrCode={getQrCode} seeAtt={seeAtt}/>
                    )
                })}
            </div>
            {/* studentsClasses.map(class => ) */}
        </Dashboard>    
    )
}