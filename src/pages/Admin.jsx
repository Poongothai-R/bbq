import Home from "./Home";
import { Link } from "react-router-dom";


export default function Admin(){

    return(
        <div id="admin" className="admin-page">
            <Home/>
            <h1> welcome to admin page</h1>
            <Link to="/admin/menu">GoTo Menu</Link>
        </div>
    );
}