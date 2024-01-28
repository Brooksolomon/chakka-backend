<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import cartStore from '../stores/cartStore';
	let products = [
		{
			id: 1,
			name: 'BLACK MAGIQUE | Black Cumin',
			price: 18.95,
			amount: 1,
			image:
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Black_Magique_3_550x825.jpg?v=1695822406'
		},
		{
			id: 2,
			name: 'SOFT BURST | Moringa',
			price: 21.95,
			amount: 1,
			image:
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Soft_Burst_3_550x825.jpg?v=1695822486'
		},
		{
			id: 3,
			name: 'RISE & GLOW | Coffee',
			price: 27.95,
			amount: 1,
			image:
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Rise_Shine_2_550x825.jpg?v=1695822474'
		}
	];

	onMount(() => {
		cartStore.update((curr) => {
			return {
				...curr,
				cartProducts: products
			};
		});
	});
</script>

<slot />
