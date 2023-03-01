import {Link, useParams} from "react-router-dom";


export default function ProductCard({ data }) {

    const { categoryID } = useParams();
    const { id,name, description, imageURL,  } = data;

    return (

        <div className="menu-item">

            <h2> {name}</h2>
            <img src={imageURL} alt={"BBQ - " + name} />
            <p>{description}</p>
            <Link to={`/menu/${categoryID}/Item/${id}`}>View More</Link>
        </div>
    )
}