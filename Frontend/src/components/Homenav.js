import logo from '../assets/logo.png'
import '../css/Homenav.css'
export default function Homenav() {
    return (
        <header>
            <div class="brand">
                <div class="brand--logo">
                    <a href="/">
                        <img src={logo} alt="Logo here" />
                    </a>
                    <a href="/">Group - 27</a>
                </div>
            </div>
            <nav class="main-nav">
                <a href="/login" id="login">Login</a>
                <a href="/register" id="register">Register</a>
            </nav>
        </header>
    )
}