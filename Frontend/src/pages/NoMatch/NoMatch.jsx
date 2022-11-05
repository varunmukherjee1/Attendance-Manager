import React from 'react'
import {Link} from "react-router-dom"

import classes from "./NoMatch.module.css"

function NoMatch() {
  return (
    <div className = {classes.body}>
        <h2>Looking for something ?</h2>
        <h5>currently our web app don't have any working page for you...</h5>
        <br />
        <p>Go to our Homepage 👉🏻 <Link to = "/">Home</Link></p>
    </div>
  )
}

export default NoMatch