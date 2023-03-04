// Node modules
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from 'react-router-dom';

// Project files
import {createDocument, deleteDocument, readDocuments, updateDocument} from "../scripts/fireStore";
import ProductCard from "../components/ProductCard";
import ModalForm from "../components/ModalForm";
import {deleteFile} from "../scripts/cloudStorage";


export default function Category({setModal}) {
    const { categoryID } = useParams();
    const location = useLocation();
    const { adminStatus } = location.state;
    const [status, setStatus] = useState(0);
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

    async function onCreate(newItem) {
        const documentId = await createDocument("/menu/" + categoryID + "/Products", newItem).catch(onFail);
        const newData = { id: documentId, ...data };
        const result = [...data, newData];
        onSuccess(result);
    }

    async function onUpdate(updatedItem, id) {
        const clonedData = [...data];
        const itemIndex = clonedData.findIndex((item) => item.id === id);
        const imageURL = clonedData[itemIndex].imageURL;
        deleteFile(imageURL);
        clonedData[itemIndex] = updatedItem;
        await updateDocument("/menu/" + categoryID + "/Products", updatedItem, id).catch(onFail);
        onSuccess(clonedData);
    }

    async function onDelete(id) {
        if (id !== undefined) {
            const clonedData = [...data];
            const itemIndex = clonedData.findIndex((item) => item.id === id);
            const imageURL = clonedData[itemIndex].imageURL;

            deleteFile(imageURL);
            await deleteDocument("/menu/" + categoryID + "/Products", id).catch(onFail);
            delete clonedData[itemIndex];
            onSuccess(clonedData);
        }
    }

    const Item = data.map((recs) => (
        <ProductCard key={recs.id} data={recs} adminStatus={adminStatus} />
    ));

    return (
        <div className="menu" id="menu">
            {status === 0 && <p>Loading... </p>}
            {status === 1 && <>{Item}
                {adminStatus === 1 && <button onClick={()=>setModal(<ModalForm setModal={setModal} onCreate={onCreate}/>)}>Add Product</button>}
            </>}
            {status === 2 && <p>Error</p>}
            <Link to="/menu">Go back</Link>
        </div>
    );

}