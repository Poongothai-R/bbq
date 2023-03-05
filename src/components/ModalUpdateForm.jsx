import { useState, useEffect } from "react";
import InputField from "./InputField";
import form from "../data/formFields.json";
import { useItems } from "../state/ContextItems";
import { ImageProcess } from "../scripts/imageProcess.js";
import { onUpdate } from "../scripts/dataManipulation";

export default function ModalUpdateForm({data,path}) {
    const { setModal, menuData, setMenuData, productData, setProductData } = useItems();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState();
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState([]);
    let folderName = (path === "menu") ? "category-image" : "product-image";
    let newItem = {};
    const id = data.id;

    useEffect(() => {
        setName(data.name);
        setDescription(data.description);
        if(path !== "menu")
        {
            setPrice(data.price);
            setIngredients(data.ingredients);
        }
    },[]);

    async function onSubmit(event) {
        event.preventDefault();
        let image;
        let keepImage = true;

        if (imageURL !== undefined) {
            image = await ImageProcess(imageURL, folderName);
            keepImage = false;
        }
        else{
            image = data.imageURL;
        }
        if (path === "menu") {
            newItem = {
                "name": name,
                "description": description,
                "imageURL": image,
            };
            const result = await onUpdate(newItem, id, menuData, path, keepImage);
            setMenuData(result);
            console.log(result);
        }
        else {
            newItem = {
                "name": name,
                "description": description,
                "imageURL": image,
                "price": price,
                "ingredients": ingredients,
            };
            const result = await onUpdate(newItem, id,productData, path, keepImage);
            setProductData(result);
            console.log(result);
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
        <form className="modal_form" key={data.id} onSubmit={(event) => onSubmit(event)}>
            <h2>Create New item</h2>
            <InputField settings={form.name} state={[name, setName]}/>
            <InputField settings={form.description} state={[description, setDescription]}/>
            <InputField settings={form.updateImageURL} state={[imageURL, setImageURL]}/>
            {path !== "menu" && <>
                <InputField settings={form.price} state={[price, setPrice]}/>
                <InputField settings={form.ingredients} state={[ingredients, setIngredients]}/></>
            }
            <button className="button_primary">Submit</button>
            <button className="button_secondary" onClick={resetForm}>Cancel</button>
        </form>
    );
}
