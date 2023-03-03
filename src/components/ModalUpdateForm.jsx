import { useState } from "react";

import InputField from "./InputField";
import form from "../data/formFields.json";
import readFile from "../scripts/resize-image/readFile";
import resizeImage from "../scripts/resize-image/resizeImage";
import { uploadFile, downloadFile } from "../scripts/cloudStorage";
import { useEffect } from "react";


export default function ModalUpdateForm({ setModal, data, onUpdate }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState();

    useEffect(() => {
        setName(data.name);
        setDescription(data.description);
        // setImageURL(data.imageURL);
    }
        , []);
    //   const [price, setPrice] = useState("");

    function updateItem(name, description, imageData) {
        console.log(imageData);
        const updatedItem = {
            "name": name,
            "description": description,
            "imageURL": imageData,
        };
        onUpdate(updatedItem, data.id);
    }

    async function onSubmit(event) {
        event.preventDefault();
        let image;

        if (imageURL !== undefined) {
            const filePath = `category-image/${Date.now()}_${imageURL.name}`;
            const imageFromFile = await readFile(imageURL);
            const resizedImage = await resizeImage(imageFromFile, 240, 180);

            await uploadFile(resizedImage, filePath);
            image = await downloadFile(filePath);
            console.log(image);
            console.log(imageURL);
        }
        else if (imageURL === undefined) {
            image = data.imageURL;
        }

        updateItem(name, description, image);
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
            <h2>Create new item</h2>
            <InputField
                settings={form.name}
                state={[name, setName]}
            />
            <InputField
                settings={form.description}
                state={[description, setDescription]}
            />
            <InputField
                settings={form.imageURL}
                state={[imageURL, setImageURL]}
            />

            <button className="button_primary">Submit</button>
            <button className="button_secondary" onClick={resetForm}>
                Cancel
            </button>
        </form>
    );
}
