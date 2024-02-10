// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { updateDoc } from 'firebase/firestore';
import { v4 } from 'uuid';

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

async function addProduct(productID, name, source, price, description, category) {
	console.log(productID, name, source, price, description, category);
	await setDoc(doc(db, 'products', String(productID)), {
		productID: productID,
		name: name,
		source: source,
		price: price,
		description: description,
		category: category
	});
}
async function deleteProduct(productID) {
	 await deleteDoc(doc(db, 'products', String(productID)));
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

	return AllProducts;
}
async function loginFunction(username, password) {
	const mydoc = await getDoc(doc(db, 'auth', 'admin'));
	const mydata = mydoc.data();
	if (username == mydata.username && password == mydata.password) {
		return true;
	} else {
		return false;
	}
}
async function fetchAdmin() {
	const mydoc = await getDoc(doc(db, 'auth', 'admin'));
	const mydata = mydoc.data();

	return mydata;
}

async function changeAdminInformation(username, password) {
	await setDoc(doc(db, 'auth', 'admin'), {
		username: username,
		password: password
	});
}

async function updateProduct(productID, updatedData) {
	const documentRef = doc(db, 'products', String(productID));
	await updateDoc(documentRef, updatedData);
}
async function addToPending(
	txnReference,
	firstName,
	lastName,
	email,
	city,
	subCity,
	description,
	order,
	price
) {
	await setDoc(doc(db, 'pending', txnReference), {
		txnReference: txnReference,
		firstName: firstName,
		lastName: lastName,
		email: email,
		city: city,
		subCity: subCity,
		description: description,
		order: order,
		price_Before_tax:price
	});
}
async function addImage(productID, img) {
	const imageRef = ref(storage, String(productID) + '/' + 'img' + v4());
	const res = await uploadBytes(imageRef, img);
}
async function fetchImageForProduct(productID) {
	const imageListRef = ref(storage, String(productID) + '/');
	var URLLIST = [];
	const response = await listAll(imageListRef);

	await Promise.all(
		response.items.map(async (item) => {
			const url = await getDownloadURL(item);
			URLLIST.push(url);
		})
	);

	return URLLIST;
}

async function fetchAllCompletedOrders() {
	const pr = collection(db, 'products','verified');
	const q = query(pr, where('completed', '==', true));
	const querySnapshot = await getDocs(q);
	const AllProducts = [];
	querySnapshot.forEach((doc) => {
		AllProducts.push(doc.data());
	});
	return AllProducts;
}
async function fetchAllIncompletedOrders() {
	const pr = collection(db, 'products','verified');
	const q = query(pr, where('completed', '==', false));
	const querySnapshot = await getDocs(q);
	const AllProducts = [];
	querySnapshot.forEach((doc) => {
		AllProducts.push(doc.data());
	});
	return AllProducts;
}
async function completeOrder(txnReference)
{
	const docref = doc(db, "verified", String(txnReference));
	await updateDoc(docref, {
	completed: true
	});
}

async function deleteVerified(productID) {
	await deleteDoc(doc(db, 'verified', String(productID)));
}



export const FireFunc = {
	addProduct, //void
	deleteProduct, //void
	fetchSpecificProuct, //object
	fetchAllProducts, //array of objects
	loginFunction, //boolean
	changeAdminInformation, //void
	addToPending, //void
	addImage, //void
	fetchProductWithCategory, //array of objects
	fetchImageForProduct,
	fetchAdmin,
	updateProduct,
	fetchAllCompletedOrders,
	fetchAllIncompletedOrders,
	completeOrder,
	deleteVerified

};
