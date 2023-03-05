import { onDelete } from "../scripts/dataManipulation";
import { useItems } from "../state/ContextItems";
import ModalUpdateForm from "./ModalUpdateForm";


export default function Actions({ data, path }) {
    const { menuData, setMenuData, productData, setProductData, setModal } = useItems();
    const { id } = data;

    async function deleteItem() {
        if (path === "menu") {
            const result = await onDelete(id, menuData, path);
            setMenuData(result);
        }
        else {
            const result = await onDelete(id, productData, path);
            setProductData(result);
        } }

    return (
        <div>
            <button onClick={() => setModal(<ModalUpdateForm data={data} path={path}/>)}>Update Category</button>
            <button onClick={() => deleteItem()}>Delete Category</button>
        </div>
    );
}