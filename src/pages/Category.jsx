// Node modules
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

// Project files
import { readDocuments } from "../scripts/fireStore";
import ProductCard from "../components/ProductCard";


export default function Menu() {
    const { categoryID } = useParams();
    console.log(categoryID)


    // Local state

    const [status, setStatus] = useState(0); // 0: loading, 1: ready, 2: error
    const [data, setData] = useState(   []);

    // Methods
    useEffect(() => {

        const loadData = async (collectionName) => {
            const data = await readDocuments(collectionName).catch(onFail);
            onSuccess(data);
        }
        loadData("/menu/"+categoryID+"/Item");
    }, []);

    function onSuccess(data) {
        setData(data);
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
    }

    const Item = data.map((recs) => (
        <ProductCard key={recs.id} data={recs} />
    ));

    return (
        <div className="menu" id="menu">
            {/* <h1>Firebase Cloud Firestore</h1>
          <h2>Create and Read document in Firestore</h2> */}

            {status === 0 && <p>Loading... </p>}
            {status === 1 && <>{Item}</> }
            {status === 2 && <p>Error</p>}
            <Link to="/menu">Go back</Link>
            {/* <Modal modalState={[modal, setModal]}  /> */}
        </div>
    );

}