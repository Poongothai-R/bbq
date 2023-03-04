// Node modules
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

// Project files
import { readDocuments, createDocument, updateDocument, deleteDocument } from "../scripts/fireStore";
import { deleteFile } from "../scripts/cloudStorage";
import MenuItem from "../components/MenuItem";
import ModalForm from "../components/ModalForm";

export default function Menu({ setModal }) {
    // Local state
    const [status, setStatus] = useState(0);
    const [data, setData] = useState([]);
    const [adminStatus, setAdminStatus] = useState(0);  //0: Guest, 1: admin
    const location = useLocation();
    const path = location.pathname;

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
        if (path.includes('/admin/menu')) {
            setAdminStatus(1);
        }
    }

    function onFail() {
        setStatus(2);
    }

    async function onCreate(newItem) {
        const documentId = await createDocument("menu", newItem).catch(onFail);
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
        await updateDocument("menu", updatedItem, id).catch(onFail);
        onSuccess(clonedData);
    }

    async function onDelete(id) {
        if (id !== undefined) {
            const clonedData = [...data];
            const itemIndex = clonedData.findIndex((item) => item.id === id);
            const imageURL = clonedData[itemIndex].imageURL;

            deleteFile(imageURL);
            await deleteDocument("menu", id).catch(onFail);
            delete clonedData[itemIndex];
            onSuccess(clonedData);
        }
    }

    const Item = data.map((recs) => (
        <MenuItem key={recs.id} data={recs} adminStatus={adminStatus} setModal={setModal} onUpdate={onUpdate}
            onDelete={onDelete} />
    ));

    return (
        <div className="menu" id="menu">

            {status === 0 && <p>Loading... </p>}
            {status === 1 && <>{Item}
                {adminStatus === 1 && <button onClick={() => setModal(<ModalForm setModal={setModal} onCreate={onCreate} />)}>Add Category</button>}
            </>}
            {status === 2 && <p>Error</p>}

        </div>
    );

}