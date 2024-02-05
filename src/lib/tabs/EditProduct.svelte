<script>
	import { onMount } from 'svelte';
	import { FireFunc } from '../../lib/firebase/firebase';
	const { fetchProductWithCategory, fetchImageForProduct } = FireFunc;
	import ProductAccordion from '../ProductAccordion.svelte';

	const categories = ['Cold-Pressed Oils', 'Herbs And Spices', 'Essential Oils'];
	let selectedCat = '';
	let products = [];

	onMount(() => {});
	let loading = false;
	const handleCatChange = async () => {
		const fetchedProducts = await fetchProductWithCategory(selectedCat);
		products = await Promise.all(
			fetchedProducts.map(async (prod) => {
				try {
					const imageURL = await fetchImageForProduct(prod.productID);
					return {
						...prod,
						id: prod.productID,
						imageURL
					};
				} catch (error) {
					console.log(error);
				}
			})
		);

		console.log('products', products);
	};
</script>

<div>
	<select
		bind:value={selectedCat}
		name=""
		id=""
		class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
		on:change={handleCatChange}
	>
		<option value="">Select Product</option>
		{#each categories as cat}
			<option value={cat}>{cat}</option>
		{/each}
	</select>
	{#if loading}
		<div class="skeleton w-[100%] h-[2rem] rounded mt-3"></div>
		<div class="skeleton w-[60%] h-[2rem] rounded mt-3"></div>
		<div class="skeleton w-[50%] h-[2rem] rounded mt-3"></div>
		<div class="skeleton w-[70%] h-[2rem] rounded mt-3"></div>
		<div class="skeleton w-[100%] h-[2rem] rounded mt-3"></div>
	{/if}

	<ProductAccordion {products} />
</div>
