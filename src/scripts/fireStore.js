// Node modules
import { collection, getDocs, addDoc,doc,updateDoc,deleteDoc } from "firebase/firestore";

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
  console.log(data);
  const documentPath = collection(database, collectionName);
  const document = await addDoc(documentPath, data);

  return document.id;
}
export async function updateDocument(collectionName, documentToUpdate) {
  const id = documentToUpdate.id;
  const reference = doc(database, collectionName, id);

  await updateDoc(reference, documentToUpdate);

  return `updated document with id ${id}`;
}

// -- Delete
export async function deleteDocument(collectionName, id) {
  const reference = doc(database, collectionName, id);

  await deleteDoc(reference);

  return `deleted document with id ${id}`;
}
