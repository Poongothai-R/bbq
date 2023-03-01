// Node modules
import { collection, getDocs } from "firebase/firestore";

// Project files
import { database } from "./firebaseSetup";

// Methods
export async function readDocuments(collectionName) {

  const querySnapshot = await getDocs(collection(database,collectionName));
  const result = [];

  querySnapshot.forEach((doc) => {
    const document = { id: doc.id, ...doc.data() };
    result.push(document);
  });
//  console.log(result);
  return result;
}

