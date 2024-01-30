<script>
	import Product from '../../../lib/Product.svelte';
	import productStore from '../../../stores/productStore';
</script>

<div>
	<p>products</p>
	{#each $productStore.products as prod}
		<Product {prod} />
	{/each}
</div>
