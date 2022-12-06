import logo from '../assets/logo.png'
import '../css/Homenav.css'
import {Link} from "react-router-dom"

export default function Homenav() {
    return (
        <header>
            <div className="brand">
                <div className="brand--logo">
                    <Link to="/">
                        <img src={logo} alt="Logo here" />
                    </Link>
                    <Link to="/">Group - 27</Link>
                </div>
            </div>
            <nav className="main-nav">
                <Link to="/login" id="login">Login</Link>
                <Link to="/register" id="register">Register</Link>
            </nav>
        </header>
    )
}