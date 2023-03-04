// Node modules
import { collection, getDocs, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";

// Project files
import { database } from "./firebaseSetup";

// Methods
export async function readDocuments(collectionName) {
  const querySnapshot = await getDocs(collection(database, collectionName));
  const result = [];
  querySnapshot.forEach((doc) => {
    const document = { id: doc.id, ...doc.data() };
    result.push(document);
  });
  return result;
}


export async function createDocument(collectionName, data){
  const documentPath = collection(database, collectionName);
  const manualID = data.name;
  const document = await setDoc(doc(documentPath, manualID), data);
  return document.id;
}

export async function updateDocument(collectionName, data, id){
  const documentPath = doc(database, collectionName, id);
  await setDoc(documentPath, data);
}

export async function deleteDocument(collectionName, id, imageURL){
  const documentPath = doc(database, collectionName, id);

  await deleteDoc(documentPath);
}