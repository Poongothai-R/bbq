


export default function Navbar(){
    return(
        <div id="navbar" className="navbar">
            <div className="logo">
                <a href="/"><span>BBQ-Restaurant</span>
                <p>Your Taste is important</p>
                </a>
            </div>
            <div className="navbar-links">
                <a href="/">Home</a>
                <a href="/menu">Menu</a>
                <a href="/contact">Contact</a>
            </div>
        </div>
    );
}