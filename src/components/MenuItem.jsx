import Actions from "./Actions";
import { Link } from "react-router-dom";
import { useItems } from "../state/ContextItems";

export default function MenuItem({ data, path }) {
    const { id:categoryID, name, description, imageURL, } = data;
    const { adminStatus } = useItems();
    
    return (

        <div className="menu-item">

            <h2> {name}</h2>
            <img src={imageURL} alt={"BBQ - " + name} />
            <p>{description}</p>
            {adminStatus === 1 &&
                <>
                    <Actions key={categoryID} data={data} path={path}/>
                    <Link to={`/admin/menu/${name}`} state={{ categoryID }}>View More</Link>
                </>
            }
            {adminStatus === 0 && <Link to={`/menu/${name}`} state={{ categoryID }}>View More</Link>}
        </div>
    )
}