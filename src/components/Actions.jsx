import { onDelete } from "../scripts/dataManipulation";
import { useItems } from "../state/ContextItems";
import ModalUpdateForm from "./ModalUpdateForm";


export default function Actions({ data, path }) {
    const { menuData, setMenuData, productData, setProductData, setModal } = useItems();
    const { id} = data;

    async function deleteItem() {
        const result = window.confirm("Are you sure?");
        if ((result) && (path === "menu") )
        {
            const result = await onDelete(id, menuData, path);
            setMenuData(result);
        }

        if( (result)&& (path !== "menu") )
        {
            const result = await onDelete(id, productData, path);
            setProductData(result);
        }
    }

    return (
        <div className="action-page" id="action">
            <button onClick={() => setModal(<ModalUpdateForm data={data} path={path} />)}>Update </button>
            <button onClick={() => deleteItem()}>Delete </button>
        </div>
    );
}