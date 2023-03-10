import { useEffect } from "react";
import { useItems } from "../state/ContextItems";
import { readDocuments } from "../scripts/fireStore";
import MenuItem from "../components/MenuItem";


export default function Menu() {
    const {  menuData, setMenuData, status, setStatus } = useItems();
    const MenuCollectionPath = "menu";

    useEffect(() => {
        const loadData = async (collectionName) => {
            const data = await readDocuments(collectionName).catch(onFail);
            onSuccess(data);
        }
        loadData(MenuCollectionPath);
    }, []);
    function onSuccess(data) {
        setMenuData(data);
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
    }

    const Category = menuData.map((recs) => (
        <MenuItem key={recs.id} data={recs} path={MenuCollectionPath} />
    ));

    return (
        <div className="menu" id="menu">
            {status === 0 && <p>Loading... </p>}
            {status === 1 && {Category}}
            {status === 2 && <p>Error</p>}
        </div>
    );
}
