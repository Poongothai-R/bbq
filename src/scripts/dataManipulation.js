import { createDocument, updateDocument, deleteDocument } from "./fireStore";
import { deleteFile } from "./cloudStorage";


export async function onCreate(newItem, data, path) {
    const documentId = await createDocument(path, newItem);
    const newData = { id: documentId, ...newItem };
    const result = [...data, newData];
    return result;
}

export async function onUpdate(updatedItem, id, data, path, keepImage) {
    const clonedData = [...data];
    const itemIndex = clonedData.findIndex((item) => item.id === id);
    const imageURL = clonedData[itemIndex].imageURL;
    if (!keepImage) { deleteFile(imageURL); }
    await updateDocument(path, updatedItem, id);
    const newData = { id: id, ...updatedItem };
    clonedData[itemIndex] = newData;
    return clonedData;
}

export async function onDelete(id, data, path) {
    if (id !== undefined) {
        const itemIndex = data.findIndex((item) => item.id === id);
        const imageURL = data[itemIndex].imageURL;

        deleteFile(imageURL);
        await deleteDocument(path, id);
        const clonedData = data.filter((item)=> item.id !== id);
        return clonedData;
    }
}

