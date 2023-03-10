import { useItems } from "../state/ContextItems";
import { Link, useParams } from "react-router-dom";
import Actions from "./Actions";

export default function ProductCard({ data,path,categoryId }) {

    const { name, description, imageURL, price } = data;
    const { adminStatus } = useItems();
    const { category } = useParams();
    const link = (adminStatus===0)?`/menu/${category}/${name}`:`/admin/menu/${category}/${name}`;

    return (
        <div className="product-item">
            <h1> {name}</h1>
            <span>Price : {price}</span>
            <img src={imageURL} alt={"BBQ - " + name} />
            <p>{description}</p>
            {adminStatus === 1 && <Actions  data={data} path={path} /> }
            <Link to={link} state={{data,categoryId}}>View More</Link>
        </div>
    );
}