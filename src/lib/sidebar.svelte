<script>
	import { fly } from 'svelte/transition';
	import CartProduct from './CartProduct.svelte';

	export let show = false;

	const products = [
		{
			id: 1,
			name: 'BLACK MAGIQUE | Black Cumin',
			price: 18.95,
			image:
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Black_Magique_3_550x825.jpg?v=1695822406'
		},
		{
			id: 2,
			name: 'SOFT BURST | Moringa',
			price: 21.95,
			image:
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Soft_Burst_3_550x825.jpg?v=1695822486'
		},
		{
			id: 3,
			name: 'RISE & GLOW | Coffee',
			price: 27.95,
			image:
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Rise_Shine_2_550x825.jpg?v=1695822474'
		}
	];

	console.log(products);
</script>

{#if show}
	<div transition:fly={{ x: 250, opacity: 1 }}>
		<p>Hello</p>
		{#each products as prod}
			<CartProduct product={prod} />
		{/each}
	</div>
{/if}

<style>
	div {
		position: fixed;
		top: 0;
		right: 0;
		height: 100%;
		padding: 2rem 1rem 0.6rem;
		border-left: 1px solid #aaa;
		background: #fff;
		overflow-y: auto;
		width: 20rem;
	}
</style>
