// Node modules
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

// Project files
import { readDocuments, createDocument ,updateDocument} from "../scripts/fireStore";
import { deleteFile} from "../scripts/cloudStorage";
import MenuItem from "../components/MenuItem";
import ModalForm from "../components/ModalForm";

export default function Menu({ setModal }) {
    // Local state
    //   const [modal,setModal] = useState(null);
    const [status, setStatus] = useState(0); // 0: loading, 1: ready, 2: error
    const [data, setData] = useState([]);

    const [adminStatus, setAdminStatus] = useState(0);  //0: Guest, 1: admin
    // const [user, setUser] = useState(null);

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
        console.log("inside onCreate ")
        const documentId = await createDocument("menu", newItem);
        const newData = { id: documentId, ...data };
        const result = [...data, newData];
        setData(result);
    }
    async function onUpdate(data) {
        const id = data.id;
        const clonedData = [...data];
        const itemIndex = clonedData.findIndex((item) => item.id === id);

        clonedData[itemIndex] = data;
        setData(clonedData);
        await updateDocument("menu", data);
    }
    deleteFile("https://firebasestorage.googleapis.com/v0/b/bbq-rest.appspot.com/o/category-image%2F1677864733842_bbq_dessert.jpeg?alt=media&token=8fa4a060-c7a8-477c-8db1-50ad1641d9d4");

   /* async function onDelete(id) {
        const clonedStudents = [...students];
        const itemIndex = clonedStudents.findIndex((item) => item.id === id);

        clonedStudents.splice(itemIndex, 1);
        setStudents(clonedStudents);
        await deleteDocument(COLLECTION_NAME, id);
    }*/

    const Item = data.map((recs) => (
        <MenuItem key={recs.id} data={recs} adminStatus={adminStatus} />
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