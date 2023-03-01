// Node modules
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

// Project files
import { readDocuments } from "../scripts/fireStore";
import ProductItem from "../components/ProductItem";


export default function Product() {
  const { categoryID,productID} = useParams();
    console.log( productID);

    // Local state

    const [status, setStatus] = useState(0); // 0: loading, 1: ready, 2: error
    const [data, setData] = useState([]);

    // Methods
    useEffect(() => {

      async function loadData()  {

            const data = await readDocuments(`menu/${categoryID}/Item/${productID}/0`).catch(onFail);
            console.log(data);
            onSuccess(data);
        }
        loadData();
    }, []);

    function onSuccess(data) {
        setData(data);
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
    }

    const Item = data.map((recs) => (
        <ProductItem key={recs.id} data={recs} />
    ));

    return (
        <div className="menu" id="menu">

            <h1>Item</h1>
           {status === 0 && <p>Loading... </p>}
            {status === 1 && <>{Item}</> }
            {status === 2 && <p>Error</p>}
            <Link to={`/menu/${categoryID}/`} >Go back</Link>
            {/* <Modal modalState={[modal, setModal]}  /> */}
        </div>
    );

}
