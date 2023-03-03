import Home from "./Home";


export default function Admin({user}){
    console.log(user);

    return(
        <div className="admin">
            <h1>Welcome to Admin Page</h1>
            <Home/>
        </div>

    );
}