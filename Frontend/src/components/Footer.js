import '../css/footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <Link to ="/aboutus" className = "content" >About Us</Link>
            <Link to ="/contactus" className = "content" >Contact Us</Link>
            <p className = "content" >© Group-27</p>
        </footer>
    )
}