import Actions from "./Actions";
import { Link } from "react-router-dom";
import { useItems } from "../state/ContextItems";

export default function MenuItem({ data, path }) {
    const { id: categoryId, name, description, imageURL, } = data;
    const { adminStatus } = useItems();
    const link = (adminStatus===0)?`/menu/${name}`:`/admin/menu/${name}`;

    return (
        <div className="menu-item">
            <h1> {name}</h1>
            <img src={imageURL} alt={name} />
            <p>{description}</p>
            {adminStatus === 1 && <Actions  data={data} path={path} /> }
            <Link to={link} state={{data,categoryId}}>View More</Link>
        </div>
    )
}