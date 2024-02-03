<script>
	import { onMount } from 'svelte';
	import Navbar from '../lib/Navbar.svelte';
	import '../app.css';
	import cartStore from '../stores/cartStore';
	import uiStore from '../stores/uiStore';
	import Sidebar from '../lib/Sidebar.svelte';
	let products = [
		{
			id: 1,
			name: 'BLACK MAGIQUE | Black Cumin',
			price: 18.95,
			amount: 1,
			images: [
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Black_Magique_3_550x825.jpg?v=1695822406',
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Black_Magique_4_280x420.jpg?v=1695652537',
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Black_Magique_1_280x420.jpg?v=1695822406',
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Black_Magique_2_280x420.jpg?v=1695822406'
			]
		},
		{
			id: 2,
			name: 'SOFT BURST | Moringa',
			price: 21.95,
			amount: 1,
			images: [
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Soft_Burst_3_550x825.jpg?v=1695822486',
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Soft_Burst_1_280x420.jpg?v=1695822486',
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Soft_Burst_2_280x420.jpg?v=1695822486',
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Soft_Burst_4_280x420.jpg?v=1695653114'
			]
		},
		{
			id: 3,
			name: 'RISE & GLOW | Coffee',
			price: 27.95,
			amount: 1,
			images: [
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Rise_Shine_2_550x825.jpg?v=1695822474',
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Rise_Shine_1_280x420.jpg?v=1695822474',
				'https://cdn.shopify.com/s/files/1/0819/8881/3081/files/Rise_Shine_4_280x420.jpg?v=1695652822'
			]
		}
	];

	onMount(() => {
		if (window) {
			cartStore.update((curr) => {
				return {
					...curr,
					cartProducts: localStorage.getItem('cart_list')
						? JSON.parse(localStorage.getItem('cart_list'))
						: []
				};
			});
		}
	});
</script>

<Navbar />
<div class="bg-[#f7f3ec] pt-[15vh] md:pt-[25vh] px-[5%]">
	<slot />
</div>

{#if $uiStore.sidebarShow}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->

	<Sidebar />
{/if}
