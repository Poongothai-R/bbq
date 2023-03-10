// Node modules
import { ref, uploadBytes, getDownloadURL, deleteObject, } from "firebase/storage";


// Project files
import { cloudStorage, } from "./firebaseSetup";

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

export async function deleteFile(imageURL) {
    const splitImageData = imageURL.split(/%2F(.*?)\?alt/);
    const folderName = splitImageData[0].split('/')[7];
    const imageName = splitImageData[1];
    const filePath = folderName + '/' + imageName;
    const reference = ref(cloudStorage, filePath);
    deleteObject(reference).then(() => {
        console.log('Image deleted from cloud storage!');
        return 1;
    })
        .catch((err) => {
            console.log(err);
            return 0;
        });
}