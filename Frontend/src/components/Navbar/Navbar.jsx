import React from 'react'

import classes from "./Navbar.module.css"

function Navbar() {
  return (
    <div className = {`${classes.navigation} ${classes.active}`}>
            <ul>
                <li>
                    <a href="#">

                        <i className ="fa-brands fa-sketch"></i>
                        <h2>Group 27</h2>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className = {classes.icon}>
                            <i className ="fa-solid fa-house"></i>
                        </span>
                        <span className = {classes.title}>Dashboard</span>
                    </a>
                </li>

                <li>
                    <a href="/profile">
                        <span className = {classes.icon}>
                            <i className ="fa-solid fa-user"></i>
                        </span>
                        <span className = {classes.title}>Profile</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className = {classes.icon}>
                            <i className ="fa-solid fa-gear"></i>
                        </span>
                        <span className = {classes.title}>Settings</span>
                    </a>
                </li>
                <li>
                    <a href="/info">
                        <span className = {classes.icon}>
                            <i className ="fa-solid fa-question"></i>
                        </span>
                        <span className = {classes.title}>help</span>
                    </a>
                </li>
                <li>
                    <a href="/aboutus">
                        <span className = {classes.icon}>
                            <i className="fa-solid fa-circle-info"></i>
                        </span>
                        <span className = {classes.title}>About us</span>
                    </a>
                </li>
                <li>
                    <a href="/logout">
                        <span className = {classes.icon}>
                            <i className ="fa-solid fa-right-from-bracket"></i>
                        </span>
                        <span className = {classes.title}>Sign Out</span>
                    </a>
                </li>

            </ul>

        </div>
  )
}

export default Navbar