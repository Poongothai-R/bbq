import { useState } from "react";
import InputField from "./InputField";
import form from "../data/formFields.json";
import { useItems } from "../state/ContextItems";
import { DataProcess } from "../scripts/DataProcess";

export default function ModalAddForm({ path }) {
    const { setModal, menuData, setMenuData, productData, setProductData  } = useItems();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState("");
    let globalData = (path === "menu") ? menuData : productData;

    async function onSubmit(event) {
        event.preventDefault();
        console.log(ingredients);
        const formData ={
            "name":name,
            "description": description,
            "imageURL": imageURL,
            "price": price,
            "ingredients": ingredients.split(','),
        }
        console.log(formData);
        const result = await DataProcess({},path,formData,"C",globalData);
        if (path === "menu"){ setMenuData(result)}
        else { setProductData(result)}
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
        <form className="modal_form" onSubmit={(event) => onSubmit(event)}>
            <h2>Create New item</h2>
            <InputField settings={form.name} state={[name, setName]} />
            <InputField settings={form.description} state={[description, setDescription]} />
            <InputField settings={form.addImageURL} state={[imageURL, setImageURL]} />
            {path !== "menu" && <>
                <InputField settings={form.price} state={[price, setPrice]} />
                <InputField settings={form.ingredients} state={[ingredients, setIngredients]} />
            </> }
            <button className="button_primary">Submit</button>
            <button className="button_secondary" onClick={resetForm}> Cancel </button>
        </form>
    );}