import { useState, useEffect } from "react";
import InputField from "./InputField";
import form from "../data/formFields.json";
import { useItems } from "../state/ContextItems";
import { DataProcess } from "../scripts/DataProcess";

export default function ModalUpdateForm({ data, path }) {
    const { setModal, menuData, setMenuData, productData, setProductData } = useItems();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState();
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState([]);
    let globalData = (path === "menu") ? menuData : productData;

    useEffect(() => {
        setName(data.name);
        setDescription(data.description);
        if (path !== "menu") { setPrice(data.price); setIngredients(data.ingredients); }
    }, []);

    async function onSubmit(event) {
        event.preventDefault();
        let ingredientArr = data.ingredients;
        if ((typeof ingredients) === "string") { ingredientArr = ingredients.split(','); }
        const formData = {
            "name": name,
            "description": description,
            "imageURL": imageURL,
            "price": price,
            "ingredients": ingredientArr,
        }
        const result = await DataProcess(data, path, formData, globalData);
        if (path === "menu") { setMenuData(result) }
        else { setProductData(result) }
        resetForm();
    }

    function resetForm() {
        setName("");
        setDescription("");
        setImageURL("");
        setPrice("");
        setIngredients("");
        setModal(null);
    }

    return (
        <form className="modal-form" key={data.id} onSubmit={(event) => onSubmit(event)}>
            <h1>Create New item</h1>
            <InputField settings={form.name} state={[name, setName]} />
            <InputField settings={form.description} state={[description, setDescription]} />
            <InputField settings={form.updateImageURL} state={[imageURL, setImageURL]} />
            {path !== "menu" && <>
                <InputField settings={form.price} state={[price, setPrice]} />
                <InputField settings={form.ingredients} state={[ingredients, setIngredients]} />
            </>}
            <div className="form-button">
                <button className="button-primary">Submit</button>
                <button className="button-secondary" onClick={resetForm}> Cancel </button>
            </div>
        </form>
    );
}
