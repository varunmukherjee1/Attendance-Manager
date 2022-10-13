import Footer from "../components/Footer";
import Homenav from "../components/Homenav";
import '../css/home.css'

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
    return (
        <>
            <section className="page-1">
                <div className="content from_left slide_in">
                    <p>New Way of Taking and Managing Attendance</p>
                </div>
                <div className="student-image from_right slide_in">
                    <img src={"../assets/attendance.png"} alt="" />
                </div>
                <div className="extra_buttons fade_in">
                    <a href="/login" id="login">Login</a>
                    <a href="/register" id="register">Register</a>
                </div>
            </section>
        </>
    )
}

function Section2() {
    return (
        <>
            <section className="page-2">
                <div className="image from_left slide_in">
                    <img src={"../assets/undraw_teaching.svg"} alt="" />
                </div>
                <div className="content from_right slide_in slow">
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
    return (
        <>
            <section className="page-3">
                <div className="features">
                    <div className="feature from_right slide_in" id="feature-3">
                        <img src={"../assets/icon8.png"} alt="" />
                        <p>Completely Automated Attendance</p>
                    </div>
                    <div className="feature from_left slide_in" id="feature-2">
                        <img src={"../assets/undraw_Happy_news.png"} alt="" />
                        <p>Easy to use</p>
                    </div>
                    <div className="feature from_right slide_in" id="feature-1">
                        <img src={"../assets/QR_Code_pic.png"} alt="" />
                        <p>QR code authentification</p>
                    </div>
                </div>
                <div className="left_img from_right slide_in">
                    <img src={"../assets/productivity_pic.png"} alt="" />
                </div>
            </section>
        </>
    )
}