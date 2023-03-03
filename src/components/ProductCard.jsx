import { Link, useParams } from "react-router-dom";


export default function ProductCard({ data, adminStatus }) {
    // const productData = data;
    const { categoryID } = useParams();
    const { id, name, description, imageURL, } = data;

    return (

        <div className="menu-item">

            <h2> {name}</h2>
            <img src={imageURL} alt={"BBQ - " + name} />
            <p>{description}</p>
            {adminStatus === 1 &&
                <>
                    <div>
                        <button>Update Product</button>
                        <button>Delete Product</button>
                    </div>
                    <Link to={`/admin/menu/${categoryID}/Products/${id}`} state={{ data, adminStatus }}>View More</Link>
                </>
            }
            {adminStatus === 0 && <Link to={`/menu/${categoryID}/Products/${id}`} state={{ data, adminStatus }}>View More</Link>}
        </div>
    )
}