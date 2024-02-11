<script>
	import Product from '../../lib/Product.svelte';
	import productStore from '../../stores/productStore';
	import { ShoppingCart } from 'phosphor-svelte';
	import uiStore from '../../stores/uiStore';
	import { onMount } from 'svelte';
	import { FireFunc } from '../../lib/firebase/firebase';
	import cartStore from '../../stores/cartStore';

	const { fetchProductWithCategory, fetchImageForProduct } = FireFunc;
	onMount(async () => {
		const fetchedProducts = await fetchProductWithCategory('Herbs And Spices');
		const products = await Promise.all(
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
		console.log(products);
		if (products.length) {
			productStore.update((curr) => {
				return {
					...curr,
					products: products
				};
			});
		}
		/*  */
	});

	let cartCount = 0;
	$: {
		cartCount = 0;
		$cartStore.cartProducts.map((product) => {
			cartCount += Number(product.amount);
		});
	}
</script>

<div class=" text-slate-800 my-8">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-40 px-[7vw]">
		{#if !$productStore.products.length}
			<div class="skeleton w-62 h-96"></div>
			<div class="skeleton w-62 h-96"></div>
			<div class="skeleton w-62 h-96"></div>
		{/if}
		{#each $productStore.products as product}
			<Product {product} />
		{/each}
	</div>

	<div class=" my-9">
		<p class=" font-light tracking-widest text-3xl my-3">Other Products</p>
		<div class="grid grid-cols-1 sm:grid-cols-2 w-[60%]">
			<a data-sveltekit-reload href="/cold-pressed-oils" class=""
				><button
					class=" sm:w-[30rem] border-2 font-light tracking-widest text-xl md:text-2xl border-slate-800 p-6 hover:bg-slate-900 hover:text-slate-200 ease-in-out transition text-center h-[5rem]"
				>
					COLD-PRESSED OILS
				</button></a
			>
			<a data-sveltekit-reload href="/essential-oils" class=""
				><button
					class=" sm:w-[30rem] border-2 font-light tracking-widest text-xl md:text-2xl border-slate-800 p-6 hover:bg-slate-900 hover:text-slate-200 ease-in-out transition text-center h-[5rem]"
				>
					ESSENTIAL OILS
				</button></a
			>
		</div>
	</div>
</div>
