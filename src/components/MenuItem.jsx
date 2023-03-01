import { Link } from "react-router-dom";


export default function MenuItem({ data }) {

    const { name, description, imageURL,  } = data;
    
    return (

        <div className="menu-item">

            <h2> {name}</h2>
            <img src={imageURL} alt={"BBQ - " + name} />
            <p>{description}</p>
            <Link to={`/menu/${name}`}>View More</Link>
        </div>
    )
}