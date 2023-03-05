import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useItems } from "../state/ContextItems";

export default function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    const { adminStatus, setAdminStatus} = useItems();

    useEffect(()=>{
        if (path.includes('/admin')) {
            setAdminStatus(1);
        }
    },[]);

    return (
        <div id="navbar" className="navbar">
            <div className="logo">
                <a href="/"><span>BBQ-Restaurant</span>
                    <p>Your Taste is important</p>
                </a>
            </div>
            <div className="navbar-links">
                <a href="/">Home</a>
                {adminStatus === 1 && <a href="/admin/menu">Menu</a> }
                {adminStatus === 0 && <a href="/menu">Menu</a> }
                <a href="/contact">Contact</a>
            </div>
        </div>
    );
}