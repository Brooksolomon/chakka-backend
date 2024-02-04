// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes,listAll, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid';

import { getAnalytics } from 'firebase/analytics';
import {
	collection,
	doc,
	setDoc,
	getFirestore,
	getDoc,
	deleteDoc,
	getDocs,
	where,
	query
} from 'firebase/firestore';
import { response } from "express";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAWlBINoNhtbdVxXB0rv7h5aDhL-ThmFcU',
	authDomain: 'chakka-origins.firebaseapp.com',
	projectId: 'chakka-origins',
	storageBucket: 'chakka-origins.appspot.com',
	messagingSenderId: '390840507227',
	appId: '1:390840507227:web:b632d983edb8a8d77ed87e',
	measurementId: 'G-M9NZFSFDL5'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
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
//addProduct(3,"EARTH BLOOM","Rosemary",21.95,"Rosmarinus officinalis 10 ML 100% PURE ESSENTIAL OIL, STEAM DISTILLED  Eastern Afromontane Biodiversity Hotspot Hair and fragrance oil Leveraging its potent antiseptic and antibacterial properties, Rosemary is a versatile solution for hair treatments, reducing topical inflammation, and promoting gut detoxification.  Properties: Eucalyptol, Terpineol, D-Limonene, Linalool, Humulene","Cold-Pressed Oils",["https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Earth_Bloom_3_280x420.jpg?v=1695822453","https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Earth_Bloom_1_280x420.jpg?v=1695822453","https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Earth_Bloom_2_280x420.jpg?v=1695822453","https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Earth_Bloom_4_280x420.jpg?v=1695651672"])
addProduct(1,"SWEET BOTANY","Lemongrass",17.95,"Embrace Lemongrass, an aromatic ally with antioxidant and anti-septic wonders. Experience its inflammation-reducing charm as it disinfects and enlivens the skin, becoming an essential ingredient in fragrance and skincare routines.Properties: Citral, Geraniol, Limonene, Elemol, Citronellal","Essential-Oils",["https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Sweet_Botany_2_280x420.jpg?v=1695822510","https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Sweet_Botany_1_280x420.jpg?v=1695822510","https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Sweet_Botany_3_280x420.jpg?v=1695652064"])
addProduct(2,"SPICY HERBAL","Ethiopian Cardamom",21.95,"Aframomum corrorima 10 ML 100% PURE ESSENTIAL OIL, STEAM DISTILLED Radiant skin, captivating scent, and clear breathing Embrace Ethiopian Cardamom's inflammation-reducing, antiseptic, and anti-bacterial properties, elevating a  skincare routine, crafting alluring fragrances, and providing soothing relief during congestion. Properties:Linalool, Pinene, Sabinene, Myrcene, Limonene, 1,8-Cineole","Herbs And Spices",["https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Spicy_Herbal_2_280x420.jpg?v=1695822503","https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Spicy_Herbal_2_280x420.jpg?v=1695822503","https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Spicy_Herbal_3_280x420.jpg?v=1695651735","https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Spicy_Herbal_4_280x420.jpg?v=1695651735"])




async function deleteProduct(productID) {
	await await deleteDoc(doc(db, 'products', String(productID)));
}

async function fetchSpecificProuct(productID) {
	const mydoc = await getDoc(doc(db, 'products', String(productID)));
	if (mydoc.exists()) {
		return mydoc.data();
	} else {
		return null;
	}
}
async function fetchAllProducts() {
	const querySnapshot = await getDocs(collection(db, 'products'));
	const AllProducts = [];
	querySnapshot.forEach((doc) => {
		AllProducts.push(doc.data());
	});
	console.log(AllProducts);
	return AllProducts;
}
async function fetchProductWithCategory(category) {
	const pr = collection(db, 'products');
	const q = query(pr, where('category', '==', category));
	const querySnapshot = await getDocs(q);
	const AllProducts = [];
	querySnapshot.forEach((doc) => {
		AllProducts.push(doc.data());
	});
	console.log(AllProducts);

	return AllProducts;
}
async function loginFunction(username, password) {
	const mydoc = await getDoc(doc(db, 'auth', 'admin'));
	const mydata = mydoc.data();
	console.log(username, mydata.username, password, mydata.password);
	if (username == mydata.username && password == mydata.password) {
		return true;
	} else {
		return false;
	}
}
async function changeAdminInformation(username, password) {
	await setDoc(doc(db, 'auth', 'admin'), {
		username: username,
		password: password
	});
}

async function addToPending(
	txnReference,
	firstName,
	lastName,
	email,
	city,
	subCity,
	description,
	order
) {
	await setDoc(doc(db, 'pending', txnReference), {
		txnReference: txnReference,
		firstName: firstName,
		lastName: lastName,
		email: email,
		city: city,
		subCity: subCity,
		description: description,
		order: order
	});
}
async function addImage(productID,img)
{
  const imageRef = ref(storage,String(productID)+'/'+"img" +v4());
  const res = await uploadBytes(imageRef,img);
  console.log(res);
  console.log("uploaded")

}
async function fetchImageForProuct(productID)
{
  const imageListRef = ref(storage,String(productID)+'/')
  var URLLIST = []
  await listAll(imageListRef).then((response)=>
  response.items.forEach(async(item) =>{
    getDownloadURL(item).then((url)=>
    {
      URLLIST.push(url)
    })
  }))

  console.log(URLLIST)
  
}
fetchImageForProuct("35e422aa-c22d-4e2a-94bd-21ea7d2f505c")

export const FireFunc = {
	addProduct: addProduct, //void
	deleteProduct: deleteProduct, //void
	fetchSpecificProuct: fetchSpecificProuct, //object
	fetchAllProducts: fetchAllProducts, //array of objects
	loginFunction: loginFunction, //boolean
	changeAdminInformation: changeAdminInformation, //void
	addToPending: addToPending, //void
	addImage: addImage, //void
	fetchProductWithCategory: fetchProductWithCategory //array of objects
};
