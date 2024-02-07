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

	console.log(product);
</script>

<div class="flex flex-col items-center">
	<img src={product.imageURL[0]} alt={product.name + ' image '} class=" p-8" />
	<p class="text-slate-900 text-center">{product.name} | {product.source}</p>
	<p class=" text-sm font-light tracking-widest text-slate-600">ETB {product.price}</p>

	<button
		on:click={showModal}
		class="btn font-light tracking-widest text-xl m-3 w-full bg-[#d6cb6b] border-none rounded p-[10px] pointer hover:bg-[#aea55a] transition ease-in-out text-slate-800"
		onclick={`my_modal_${modalId}.showModal()`}>VIEW PRODUCT</button
	>
</div>

<Modal id={modalId}>
	<ProductDetails {product} /></Modal
>
