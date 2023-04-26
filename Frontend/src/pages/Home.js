import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';

import Footer from "../components/Footer";
import Homenav from "../components/Homenav";
import '../css/home.css'
// import Loader from "../components/Loader/Loader";

import pic1 from "../assets/attendance.png"
import fet1 from "../assets/undraw_teaching.svg"
import fet2 from "../assets/undraw_Happy_news.png"
import fet3 from "../assets/icon8.png"
import fet4 from "../assets/QR_Code_pic.png"
import endimg from "../assets/productivity_pic.png"

export default function Home() {
    return (
        <>
            <Homenav />
            <main>
                <div className="back-to-top">
                </div>
                <Section1 />
                <hr />
                <Section2 />
                <Section3 />
            </main>
            <Footer />
        </>
    )
}


function Section1() {

    const { ref: ref1, inView: view1 } = useInView();
    const { ref: ref2, inView: view2 } = useInView();
    const { ref: ref3, inView: view3 } = useInView();

    return (
        <>
            <section className="page-1">
                <div ref = {ref1} className={`content from_left slide_in ${view1? "appear":""}`}>
                    <p>New Way of Taking and Managing Attendance</p>
                </div>
                <div ref = {ref2} className={`student-image from_right slide_in ${view2? "appear":""}`}>
                    <img src={pic1} alt="" />
                </div>
                <div ref = {ref3} className={`extra_buttons fade_in ${view3? "appear":""}`}>
                    <Link to ="/login" id="login">Login</Link>
                    <Link to ="/register" id="register">Register</Link>
                </div>
            </section>
        </>
    )
}

function Section2() {
    const { ref: ref1, inView: view1 } = useInView();
    const { ref: ref2, inView: view2 } = useInView();

    return (
        <>
            <section className="page-2">
                <div ref = {ref1} className={`image from_left slide_in ${view1? "appear":""}`}>
                    <img src={fet1} alt="" />
                </div>
                <div ref = {ref2} className={`content from_right slide_in slow ${view2? "appear":""}`}>
                    <p>
                        Group-27 provides a simple and reliable system to take attendance in classNameroom.
                        It Provides teachers with a handful of tools so that the teachers can just focus on delivering
                        quality content to their students , hence improving the teaching - learning process.
                    </p>
                </div>
            </section>
        </>
    )
}

function Section3() {
    const { ref: ref1, inView: view1 } = useInView();
    const { ref: ref2, inView: view2 } = useInView();
    const { ref: ref3, inView: view3 } = useInView();
    const { ref: ref4, inView: view4 } = useInView();

    return (
        <>
            <section className="page-3">
                <div className="features">
                    <div ref = {ref1} className={`feature from_right slide_in ${view1? "appear":""}`} id="feature-3">
                        <img src={fet3} alt="" />
                        <p>Completely Automated Attendance</p>
                    </div>
                    <div ref = {ref2} className={`feature from_left slide_in ${view2? "appear":""}`} id="feature-2">
                        <img src={fet2} alt="" />
                        <p>Easy to use</p>
                    </div>
                    <div ref = {ref3} className={`feature from_right slide_in ${view3? "appear":""}`} id="feature-1">
                        <img src={fet4} alt="" />
                        <p>QR code authentification</p>
                    </div>
                </div>
                <div ref = {ref4} className={`left_img from_right slide_in ${view4? "appear":""}`}>
                    <img src={endimg} alt="" />
                </div>
            </section>
        </>
    )
}