// Node modules
import { useEffect, useState } from "react";

// Project files
import { readDocuments } from "../scripts/fireStore";
import MenuItem from "../components/MenuItem";
import {Link} from "react-router-dom";
// import CarsPage from "./pages/CarsPage";
// import Modal from "./components/Modal";

export default function Menu() {
    // Local state
    //   const [modal,setModal] = useState(null);
    const [status, setStatus] = useState(0); // 0: loading, 1: ready, 2: error
    const [data, setData] = useState([]);

    // Methods
    useEffect(() => {
        const loadData = async (collectionName) => {
            const data = await readDocuments(collectionName).catch(onFail);
            onSuccess(data);
        }
        loadData("menu");
    }, []);

    function onSuccess(data) {
        setData(data);
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
    }

    const Item = data.map((recs) => (
        <MenuItem key={recs.id} data={recs} />
    ));

    return (
        <div className="menu" id="menu">
            {/* <h1>Firebase Cloud Firestore</h1>
          <h2>Create and Read document in Firestore</h2> */}

            {status === 0 && <p>Loading... </p>}
            {status === 1 && <>{Item}</> }
            {status === 2 && <p>Error</p>}
            {/* <Modal modalState={[modal, setModal]}  /> */}

        </div>
    );

}