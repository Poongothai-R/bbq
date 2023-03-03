// Node modules
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Project files
import { cloudStorage } from "./firebaseSetup";

export async function uploadFile(file, filePath) {
    const reference = ref(cloudStorage, filePath);

    await uploadBytes(reference, file);

    return `File uploaded successfully to ${filePath}`;
}

export async function downloadFile(filePath) {
    const reference = ref(cloudStorage, filePath);
    const result = await getDownloadURL(reference);

    return result;
}


export async function deleteFile(url) {
    let storageReference =
       await( cloudStorage.refFromURL(url));
    const imgName = storageReference.name;
    console.log(imgName);
}