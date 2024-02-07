<script>
	import { onMount } from 'svelte';
	import Navbar from '../lib/Navbar.svelte';
	import '../app.css';
	import cartStore from '../stores/cartStore';
	import uiStore from '../stores/uiStore';
	import Sidebar from '../lib/Sidebar.svelte';

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
<div class="bg-[#f7f3ec] pt-[10vh] md:pt-[5vh] px-[5%] min-h-[100vh]">
	<slot />
</div>

{#if $uiStore.sidebarShow}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->

	<Sidebar />
{/if}
