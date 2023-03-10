import Menu from "./Menu";
import ModalAddForm from "../components/ModalAddForm";
import {useItems} from "../state/ContextItems";


export default function AdminMenu(){
    const {  setModal } = useItems();
    const MenuCollectionPath = "menu";

    return(
        <div className="menu">
            <Menu/>
           <button onClick={() => setModal(<ModalAddForm path={MenuCollectionPath}/>)}>Add Category</button>
        </div>
    );
}