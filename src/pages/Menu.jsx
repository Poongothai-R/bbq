
import { useEffect } from "react";
import { useItems } from "../state/ContextItems";
import { readDocuments } from "../scripts/fireStore";
import MenuItem from "../components/MenuItem";
import ModalAddForm from "../components/ModalAddForm";


export default function Menu() {
    const { adminStatus, setModal, menuData, setMenuData, status, setStatus } = useItems();
    const MenucollectionPath = "menu";

    useEffect(() => {
        const loadData = async (collectionName) => {
            const data = await readDocuments(collectionName).catch(onFail);
            onSuccess(data);
        }
        loadData(MenucollectionPath);
    }, []);

    function onSuccess(data) {
        setMenuData(data);
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
    }

    const Category = menuData.map((recs) => (
        <MenuItem key={recs.id} data={recs} path={MenucollectionPath} />
    ));

    return (
        <div className="menu" id="menu">

            {status === 0 && <p>Loading... </p>}
            {status === 1 && <>{Category}
                {adminStatus === 1 && <button onClick={() => setModal(<ModalAddForm path={MenucollectionPath}/>)}>Add Category</button>}
            </>}
            {status === 2 && <p>Error</p>}
        </div>
    );
}
