import { ImageProcess } from "./imageProcess.js";
import { onUpdate, onCreate } from "./dataManipulation";

export async function DataProcess(data, path, formData, flag, globalData) {

    const { name, description, imageURL, price, ingredients } = formData;
    console.log(formData);
    let folderName = (path === "menu") ? "category-image" : "product-image";
    let newItem = {};
    let result = {};
    let image;
    let keepImage = true;


    if (imageURL !== undefined) {
        image = await ImageProcess(imageURL, folderName);
        keepImage = false;
    }
    else {
        image = data.imageURL;
    }

    if (path === "menu") {
        newItem = {
            "name": name,
            "description": description,
            "imageURL": image,
        };

        if (flag === 'U') { result = await onUpdate(newItem, data.id, globalData, path, keepImage); }
        else if (flag === 'C') { result = await onCreate(newItem, globalData, path); }
        return result;
    }
    else {
        newItem = {
            "name": name,
            "description": description,
            "imageURL": image,
            "price": price,
            "ingredients": ingredients,
        };
        if (flag === 'U') { result = await onUpdate(newItem, data.id, globalData, path, keepImage); }
        else if (flag === 'C') { result = await onCreate(newItem, globalData, path); }
        return result;
    }

}