<script>
	import Product from '../../lib/Product.svelte';
	import productStore from '../../stores/productStore';

	console.log($productStore.products);
</script>

<div class=" text-slate-800 my-8">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-40 px-[7vw]">
		{#each $productStore.products as product}
			<Product {product} />
		{/each}
	</div>

	<div class=" my-9">
		<p class=" font-light tracking-widest text-3xl my-3">Other Products</p>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-2/3">
			<button
				class=" border-2 font-light tracking-widest text-2xl border-slate-800 p-6 hover:bg-slate-900 hover:text-slate-200 ease-in-out transition"
			>
				COLD-PRESSED OILS
			</button>
			<button
				class=" border-2 font-light tracking-widest text-2xl border-slate-800 p-6 hover:bg-slate-900 hover:text-slate-200 ease-in-out transition"
			>
				HERBES AND SPICES
			</button>
		</div>
	</div>
</div>
