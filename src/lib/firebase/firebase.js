// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, setDoc,getFirestore, getDoc,deleteDoc,getDocs } from "firebase/firestore"; 
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


async function addProduct(productID,name,source,price,description,category,imageURL){
    await setDoc(doc(db, "products", String(productID)),
    {
        productID:productID,
        name:name,
        source:source,
        price:price,
        description:description,
        category:category,
        imageURL:imageURL

    });

}

async function deleteProduct(productID){
  await await deleteDoc(doc(db, "products", String(productID)));
}

async function fetchSpecificProuct(productID)
{
  const mydoc = await(getDoc(doc(db,"products",String(productID))))
  if (mydoc.exists()){
    return mydoc.data()
  }else{
    return null
  }
}
async function fetchAllProducts()
{
  const querySnapshot = await getDocs(collection(db, "products"));
  const AllProducts = []
  querySnapshot.forEach((doc) => {
    AllProducts.push(doc.data());
  });
  console.log(AllProducts)
  return AllProducts
}

async function loginFunction(username,password)
{
  const mydoc = await(getDoc(doc(db,"auth","admin")))
  const mydata = mydoc.data()
  console.log(username,mydata.username, password,mydata.password)
  if(username==mydata.username && password==mydata.password)
  {
    return true;
  }
  else{
    return false;
  }
}
async function changeAdminInformation(username,password)
{
  await setDoc(doc(db, "auth", "admin"),
  {
    username:username,
    password:password

  });
}


export const FireFunc = {
  addProduct:addProduct ,//void
  deleteProduct:deleteProduct,//void
  fetchSpecificProuct:fetchSpecificProuct,//object
  fetchAllProducts:fetchAllProducts,//array of objects
  loginFunction:loginFunction,//boolean
  changeAdminInformation:changeAdminInformation//void
}