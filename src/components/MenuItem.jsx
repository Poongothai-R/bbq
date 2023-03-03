import { Link } from "react-router-dom";


export default function MenuItem({ data, adminStatus,onUpdate }) {

    const { name, description, imageURL, } = data;

    const updatedData = { ...data };

    return (

        <div className="menu-item">

            <h2> {name}</h2>
            <img src={imageURL} alt={"BBQ - " + name} />
            <p>{description}</p>
            {adminStatus === 1 &&
                <>
                    <div>
                        <button onClick={() => onUpdate(updatedData)}>Update Category</button>
                        <button>Delete Category</button>
                    </div>
                    <Link to={`/admin/menu/${name}`} state={{ adminStatus }}>View More</Link>
                </>
            }
            {adminStatus === 0 && <Link to={`/menu/${name}`} state={{ adminStatus }}>View More</Link>}
        </div>
    )
}