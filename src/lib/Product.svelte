<script>
	export let product;
	import { writable } from 'svelte/store';
	import Modal from 'svelte-simple-modal';
	import productStore from '../stores/productStore';
	import ProductDetails from './ProductDetails.svelte';

	const modal = writable(null);
	const showModal = () => {
		productStore.update((curr) => {
			return {
				...curr,
				activeProduct: product
			};
		});
		modal.set(ProductDetails);
	};
</script>

<div class="flex flex-col items-center">
	<img src={product.images[0]} alt={product.name + ' image '} class=" p-8" />
	<p class="text-slate-900">{product.name}</p>
	<p class=" text-sm font-light tracking-widest text-slate-600">ETB {product.price}</p>

	<button
		on:click={showModal}
		for="product_details"
		class="btn font-light tracking-widest text-xl m-3 w-full bg-[#d6cb6b] border-none rounded p-[10px] pointer hover:bg-[#aea55a] transition ease-in-out text-slate-800"
		>VIEW PRODUCT</button
	>
</div>

<Modal classBg="" show={$modal}></Modal>
