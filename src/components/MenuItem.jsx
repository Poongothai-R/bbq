import { Link } from "react-router-dom";
import ModalUpdateForm from "./ModalUpdateForm";

export default function MenuItem({ data, adminStatus, setModal, onUpdate, onDelete }) {

    const { id,name, description, imageURL, } = data;
    console.log(id);

    return (

        <div className="menu-item">

            <h2> {name}</h2>
            <img src={imageURL} alt={"BBQ - " + name} />
            <p>{description}</p>
            {adminStatus === 1 &&
                <>
                    <div>
                        <button onClick={()=>setModal(<ModalUpdateForm setModal={setModal} data={data} onUpdate={onUpdate}/>)}>Update Category</button>
                        <button onClick={()=> onDelete(id) }>Delete Category</button>
                    </div>
                    <Link to={`/admin/menu/${id}`} state={{ adminStatus }}>View More</Link>
                </>
            }
            {adminStatus === 0 && <Link to={`/menu/${id}`} state={{ adminStatus }}>View More</Link>}
        </div>
    )
}