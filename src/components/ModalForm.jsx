import { useState } from "react";
import InputField from "./InputField";
import form from "../data/formFields.json";
import readFile from "../scripts/resize-image/readFile";
import resizeImage from "../scripts/resize-image/resizeImage";
import { uploadFile, downloadFile } from "../scripts/cloudStorage";


export default function ModalForm({ setModal, onCreate }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");


    function addItem(name, description, image) {
        const newItem = {
            "name": name,
            "description": description,
            "imageURL": image,
        };
        onCreate(newItem);
    }

    async function onSubmit(event) {
        event.preventDefault();
        
        const filePath = `category-image/${Date.now()}_${imageURL.name}`;
        const imageFromFile = await readFile(imageURL);
        const resizedImage = await resizeImage(imageFromFile, 240, 180);

        await uploadFile(resizedImage, filePath);
        const image = await downloadFile(filePath);
        console.log(await downloadFile(filePath));

        addItem(name, description, image);
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
