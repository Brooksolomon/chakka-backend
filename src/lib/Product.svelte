<script>
	export let product;
	import { writable } from 'svelte/store';
	import Modal from '../lib/Modal.svelte';
	import productStore from '../stores/productStore';
	import ProductDetails from './ProductDetails.svelte';
	import modalStore from '../stores/modalStore';
	import { onMount } from 'svelte';

	const showModal = () => {
		productStore.update((curr) => {
			return {
				...curr,
				activeProduct: product
			};
		});
	};

	onMount(() => {
		console.log($modalStore);
	});
</script>

<div class="flex flex-col items-center">
	<img src={product.images[0]} alt={product.name + ' image '} class=" p-8" />
	<p class="text-slate-900">{product.name}</p>
	<p class=" text-sm font-light tracking-widest text-slate-600">ETB {product.price}</p>

	<button
		on:click={showModal}
		class="btn font-light tracking-widest text-xl m-3 w-full bg-[#d6cb6b] border-none rounded p-[10px] pointer hover:bg-[#aea55a] transition ease-in-out text-slate-800"
		onclick={`my_modal_${product.id}.showModal()`}>VIEW PRODUCT</button
	>
</div>

<Modal id={product.id}>
	<ProductDetails {product} /></Modal
>
