import { useState } from "react";
import { useLocation } from "react-router";


export default function AdminStatus() {
    const location = useLocation();
    const path = location.pathname;
    const [adminStatus, setAdminStatus] = useState(0); //0: Guest, 1: Admin
    if (path.includes('/admin/menu')) {
        setAdminStatus(1);
    }
    return adminStatus;
}