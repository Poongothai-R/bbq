// Node modules
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from 'react-router-dom';

// Project files
import { readDocuments } from "../scripts/fireStore";
import ProductCard from "../components/ProductCard";
import ModalForm from "../components/ModalForm";


export default function Category({setModal}) {
    const { categoryID } = useParams();
    const location = useLocation();
    const { adminStatus } = location.state;
    // console.log(adminStatus);
    // Local state

    const [status, setStatus] = useState(0); // 0: loading, 1: ready, 2: error
    const [data, setData] = useState([]);

    // Methods
    useEffect(() => {

        const loadData = async (collectionName) => {
            const data = await readDocuments(collectionName).catch(onFail);
            onSuccess(data);
        }
        loadData("/menu/" + categoryID + "/Products");
    }, []);

    function onSuccess(data) {
        setData(data);
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
    }

    const Item = data.map((recs) => (
        <ProductCard key={recs.id} data={recs} adminStatus={adminStatus} />
    ));

    return (
        <div className="menu" id="menu">
            {status === 0 && <p>Loading... </p>}
            {status === 1 && <>{Item}
                {adminStatus === 1 && <button onClick={()=>setModal(<ModalForm setModal={setModal}/>)}>Add Product</button>}
            </>}
            {status === 2 && <p>Error</p>}
            <Link to="/menu">Go back</Link>
        </div>
    );

}