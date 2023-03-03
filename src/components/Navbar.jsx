import { useLocation } from "react-router-dom";


export default function Navbar() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <div id="navbar" className="navbar">
            <div className="logo">
                <a href="/"><span>BBQ-Restaurant</span>
                    <p>Your Taste is important</p>
                </a>
            </div>
            <div className="navbar-links">
                <a href="/">Home</a>
                {
                    (path.includes('/admin')) ?
                        <a href="/admin/menu">Menu</a>
                        :
                        <a href="/menu">Menu</a>
                }
                <a href="/contact">Contact</a>
            </div>
        </div>
    );
}