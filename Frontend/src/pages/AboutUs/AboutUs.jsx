import React from 'react'
import classes from './AboutUs.module.css'
import krishna from '../../assets/krishna.jpeg'
import rohan from '../../assets/rohan.jpeg'
import varunbansal from '../../assets/varun_kumar_bansal.jpeg'
import varunmukj from '../../assets/varun_mkh.jpg'
import saket from '../../assets/saket.jpeg'
import iogo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    return (
        <div className={classes["aboutUs"]}>
            <div className = {classes.header}>
                <div className={classes["brand--logo"]}>
                        <a href="/">
                            <img src={iogo} alt="" />
                        </a>
            
                        <a href="/">Group - 27</a>
                </div>
                
                
                
                <div className={classes["main-nav"]}>
                    <nav >
                        
                        <a href="/login" id="login">Login</a>
                        <a href="/register" id="register">Register</a>
        
        
                    </nav>
                </div>
            </div>

            <div className={classes["heading"]}>
                <h1 >About Us</h1>
            </div>
            <div className={classes.short_def}>
                <p>
                    This is a web-base application , which is basically an automated system for taking attendance.
                    The system will make the process of taking attendance very easy. And reduces the difficulties in taking attendance like in manual method.
                </p>
            </div>


            <div className={classes["team"]}>
                <div className={classes["heading"]}>
                    <h1 >Our Team</h1>
                </div>

                <h3 className={classes["h3"]}>Background</h3>

                <p>
                    We all are the sophomores at Indian Institute of Information Technology,
                    Sri City, Chittoor pursuing our B.Tech in Computer Science and Engineering
                    department.
                    Our vision is to make the attendance taking process completely
                    automated so that the professors can focus on teaching and delivering
                    quality content to his/her students without worrying much about
                    student's attendance.
                </p>

                <h3 className={classes["h3"]}>Team Members</h3>

                <div className={classes.members}>
                    <div className={classes.member}>
                        <div className={classes.pic}>
                            <img src={varunbansal} alt="" />
                        </div>

                        <h4>Varun Kumar Bansal</h4>
                        <h4>S20200010223</h4>
                        <h4>varunakumar.b20@iiits.in</h4>
                    </div>

                    <div className={classes.member}>
                        <div className={classes.pic}>
                            <img src={varunmukj} alt="" />
                        </div>

                        <h4>Varun Mukherjee</h4>
                        <h4>S20200010224</h4>
                        <h4>varun.m20@iiits.in</h4>
                    </div>

                    <div className={classes.member}>
                        <div className={classes.pic}>
                            <img src={saket} alt="" />
                        </div>

                        <h4>Saket Ranjan</h4>
                        <h4>S20200010185</h4>
                        <h4>saket.r20@iiits.in</h4>
                    </div>

                    <div className={classes.member}>
                        <div className={classes.pic}>
                            <img src={rohan} alt="" />
                        </div>

                        <h4>Mudavath Sugali Rohan</h4>
                        <h4>S20200010137</h4>
                        <h4>sugalirohan.m20@iiits.in</h4>
                    </div>

                    <div className={classes.member}>
                        <div className={classes.pic}>
                            <img src={krishna} alt="" />
                        </div>

                        <h4>Mudi Krishna Vamsi</h4>
                        <h4>S20200010138</h4>
                        <h4>krishnavamshi.m20@iiits.in</h4>
                    </div>
                </div>

            </div>

            <div className={classes.more_info}>

                <Link class={classes.more_info} to="/Info"> web docs</Link>

            </div>

            <footer>

                <p class="content" >&copy; Group-27</p>
            </footer>
        </div>

    )
}

export default AboutUs
