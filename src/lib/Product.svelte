<script>
	export let product;
	import { writable } from 'svelte/store';
	import Modal from '../lib/Modal.svelte';
	import productStore from '../stores/productStore';
	import ProductDetails from './ProductDetails.svelte';
	import { onMount } from 'svelte';

	const showModal = () => {
		productStore.update((curr) => {
			return {
				...curr,
				activeProduct: product
			};
		});
	};

	const returnFirstImage = () => {
		let firstImage;
		product.imageURL.map((im) => {
			if (im.split('?')[0].slice(-1) === '0') {
				firstImage = im;
			}
		});

		return firstImage;
	};
	function generateRandomString(length) {
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		let randomString = '';

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			randomString += characters.charAt(randomIndex);
		}

		return randomString;
	}
	let modalId = generateRandomString(6);
</script>

<div class="flex flex-col items-center">
	<img src={returnFirstImage()} alt={product.name + ' image '} class=" p-8 w-10/12" />
	<p class="text-slate-900 text-center mb-2"><b>{product.name} | {product.source}</b></p>
	<p class=" text-sm font-light tracking-widest text-slate-600 mb-3">ETB {product.price}</p>

	<button
		on:click={showModal}
		class="btn font-light tracking-widest text-l m-3 w-1/2 bg-[#d6cb6b] border-none rounded p-[10px] pointer hover:bg-[#aea55a] transition ease-in-out text-slate-800"
		onclick={`my_modal_${modalId}.showModal()`}>VIEW PRODUCT</button
	>
</div>

<Modal id={modalId}>
	<ProductDetails {product} /></Modal
>
