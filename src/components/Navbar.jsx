import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useItems } from "../state/ContextItems";
import Logo from "../assets/steak-mansion-logo.png";
import MobileLogo from "../assets/mobile-logo.png";


export default function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    const { adminStatus, setAdminStatus } = useItems();

    useEffect(() => {
        if (path.includes('/admin')) {
            setAdminStatus(1);
        }
    }, []);

    return (
        <div id="navbar" >
                <a href="/">
                    <picture className="logo">
                        <source media="(max-width:600px)" srcSet={MobileLogo} />
                        <img src={Logo} alt="A bull with company name"/>
                    </picture>
                </a>
            <div className="navbar-links">
                {adminStatus === 1 && <a href="/admin">Home</a>}
                {adminStatus === 0 && <a href="/">Home</a>}
                {adminStatus === 1 && <a href="/admin/menu">Menu</a>}
                {adminStatus === 0 && <a href="/menu">Menu</a>}
                <a href="/contact">Contact</a>
            </div>
        </div>
    );
}