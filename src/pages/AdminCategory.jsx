import Category from "./Category";
import ModalAddForm from "../components/ModalAddForm";
import { useItems } from "../state/ContextItems";
import { useLocation } from "react-router-dom";

export default function AdminCategory() {
  const { setModal } = useItems();
  const location = useLocation();
  const category = location.state.categoryID;
  const ProductCollectionPath = "menu/" + category + "/Products";

  return (
    <div className="category">
      <Category>
        <button
          onClick={() =>
            setModal(<ModalAddForm path={ProductCollectionPath} />)
          }
        >
          Add Product
        </button>
      </Category>
    </div>
  );
}
