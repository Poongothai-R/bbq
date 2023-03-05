import { useItems } from "../state/ContextItems";
import { Link, useParams } from "react-router-dom";
import Actions from "./Actions";

export default function ProductCard({ data,path,categoryId }) {
    const { id, name, description, imageURL, price } = data;
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
                    <Actions key={id} data={data} path={path} />
                    <Link to={`/admin/menu/${category}/${name}`} state={{data,categoryId}}>View More</Link>
                </>
            }
            {adminStatus === 0 &&
                <Link to={`/menu/${category}/${name}`} state={{data}}>View More</Link>}
        </div>
    );
}