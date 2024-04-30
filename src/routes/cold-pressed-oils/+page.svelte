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
		const fetchedProducts = await fetchProductWithCategory('Cold-Pressed Oils');
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
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-40">
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
		<p class=" font-light tracking-widest text-2xl my-3 text-center md:text-left">Other Products</p>
		<div
			class=" flex items-center flex-col md:flex-row md:justify-between md:w-[90%] lg:w-[70%] xl:w-[60%]"
		>
			<a href="/essential-oils" data-sveltekit-reload class=" my-3 mx-4"
				><button
					class=" w-[10rem] md:w-[20rem] lg:w-[30rem] border-2 font-light tracking-widest text-xl md:text-2xl border-slate-800 p-6 hover:bg-slate-900 hover:text-slate-200 ease-in-out transition text-center h-[5rem]"
				>
					ESSENTIAL OILS
				</button></a
			>
			<a href="/herbs-and-spices" data-sveltekit-reload class=" my-3 mx-4"
				><button
					class=" border-2 font-light tracking-widest text-xl md:text-2xl  w-[10rem] md:w-[20rem] lg:w-[30rem] border-slate-800 p-6 hover:bg-slate-900 hover:text-slate-200 ease-in-out transition text-center h-[5rem]"
				>
					HERBS & SPICES
				</button></a
			>
		</div>
	</div>
</div>

<div
	on:click={() => {
		uiStore.update((curr) => {
			return {
				...curr,
				sidebarShow: true
			};
		});
	}}
	class=" w-12 h-16 items-center fixed right-2 top-[45%] flex flex-col w-fit gap-1 rounded-md bg-[#d6cb6b] p-1 px-2 rounded-full"
>
	<large> {cartCount}</large>
	<ShoppingCart color="#1e2938" class="" weight="thin" size={30} />
</div>
