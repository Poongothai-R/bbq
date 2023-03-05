import { useState } from "react";
import InputField from "./InputField";
import form from "../data/formFields.json";
import { useItems } from "../state/ContextItems";
import { ImageProcess } from "../scripts/imageProcess.js";
import { onCreate } from "../scripts/dataManipulation";

export default function ModalAddForm({ path }) {
    const { setModal, menuData, setMenuData, productData, setProductData } = useItems();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState([]);
    let folderName = (path === "menu") ? "category-image" : "product-image";
    let newItem = {};

    async function onSubmit(event) {
        event.preventDefault();
        let image ;
        if (imageURL !== undefined) {
            image = await ImageProcess(imageURL, folderName);
        }
        else{ image = imageURL }
        if (path === "menu") {
            newItem = {
                "name": name,
                "description": description,
                "imageURL": image,
            };
            const data = await onCreate(newItem, menuData, path);
            setMenuData(data);
        }
        else {
            newItem = {
                "name": name,
                "description": description,
                "imageURL": image,
                "price": price,
                "ingredients": ingredients,
            };
            const data = await onCreate(newItem, productData, path);
            setProductData(data);
        }
        resetForm();
    }
    function resetForm() {
        setName("");
        setDescription("");
        setImageURL("");
        setModal(null);
    }

    return (
        <form className="modal_form" onSubmit={(event) => onSubmit(event)}>
            <h2>Create New item</h2>
            <InputField settings={form.name} state={[name, setName]}/>
            <InputField settings={form.description} state={[description, setDescription]}/>
            <InputField settings={form.addImageURL} state={[imageURL, setImageURL]}/>
            {path !== "menu" && <>
                <InputField settings={form.price} state={[price, setPrice]}/>
                <InputField settings={form.ingredients} state={[ingredients, setIngredients]}/></>
            }
            <button className="button_primary">Submit</button>
            <button className="button_secondary" onClick={resetForm}>Cancel</button>
        </form>
    );
}