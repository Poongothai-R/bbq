import { useItems } from "../state/ContextItems";
import { Link, useParams } from "react-router-dom";
import Actions from "./Actions";

export default function ProductCard({ data,path,categoryID }) {
    const { id,name, description, imageURL, price } = data;
    const { adminStatus } = useItems();
    const { category } = useParams();
    return (

        <div className="product-item">

            <h2> {name}</h2>
            <img src={imageURL} alt={"BBQ - " + name} />
            <p>{description}</p>
            <p>{price}</p>
            {adminStatus === 1 &&
                <>
                    <Actions data={data} path={path} />
                    <Link to={`/admin/menu/${category}/${id}`} state={{data,categoryID}}>View More</Link>
                </>
            }
            {adminStatus === 0 &&
                <Link to={`/menu/${category}/${id}`} state={{data,categoryID}}>View More</Link>}
        </div>
    );
}