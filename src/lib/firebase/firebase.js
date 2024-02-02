// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, addDoc,getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWlBINoNhtbdVxXB0rv7h5aDhL-ThmFcU",
  authDomain: "chakka-origins.firebaseapp.com",
  projectId: "chakka-origins",
  storageBucket: "chakka-origins.appspot.com",
  messagingSenderId: "390840507227",
  appId: "1:390840507227:web:b632d983edb8a8d77ed87e",
  measurementId: "G-M9NZFSFDL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);


async function addProduct(name,source,price,description,category,imageURL){
    await addDoc(collection(db, "cities"),
    {
        name:name,
        source:source,
        price:price,
        description:description,
        category:category,
        imageURL:imageURL

    });

}

addProduct("hey","there",2000,"yeah thats tuff","first",['x','y','z'])
