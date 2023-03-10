import { createDocument, updateDocument, deleteDocument } from "./fireStore";
import { deleteFile } from "./cloudStorage";


export async function onCreate(newItem, data, path) {

    const documentId = await createDocument(path, newItem);
    const newData = { id: documentId, ...newItem };
    const result = [...data, newData];
    return result;
}

export async function onUpdate(updatedItem, id, data, path, keepImage) {
    console.log("inside onUpdate - ",id);
    const clonedData = [...data];
    const itemIndex = clonedData.findIndex((item) => item.id === id);
    const imageURL = clonedData[itemIndex].imageURL;
    if (!keepImage) { deleteFile(imageURL); }
    const newData = { id: id, ...updatedItem };
    clonedData[itemIndex] = newData;
    await updateDocument(path, updatedItem, id);
    return clonedData;
}

export async function onDelete(id, data, path) {
    if (id !== undefined) {
        const clonedData = [...data];
        const itemIndex = clonedData.findIndex((item) => item.id === id);
        const imageURL = clonedData[itemIndex].imageURL;

        deleteFile(imageURL);
        await deleteDocument(path, id);
        delete clonedData[itemIndex];
        return clonedData;
    }
}

