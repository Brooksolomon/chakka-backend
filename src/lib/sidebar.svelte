<script>
	import { fly } from 'svelte/transition';
	import CartProduct from './CartProduct.svelte';
	import cartStore from '../stores/cartStore';
	import { onMount } from 'svelte';
	export let show = false;
	export let hideSidebar;

	const handleClick = (id, task) => {
		const newList = $cartStore.cartProducts
			.filter((product) => !(product.id === id && task === 'decr' && product.amount === 1))
			.map((product) => {
				if (product.id === id) {
					return {
						...product,
						amount:
							task === 'incr'
								? product.amount + 1
								: product.amount > 1
									? product.amount - 1
									: product.amount
					};
				} else {
					return product;
				}
			});

		console.log('newList', newList);
		localStorage.setItem('cart_list', JSON.stringify(newList));
		cartStore.update((curr) => {
			return {
				...curr,
				cartProducts: newList
			};
		});
	};

	let subtotal = 0;

	$: {
		subtotal = 0;
		$cartStore.cartProducts.map((product) => {
			subtotal += Number(parseFloat((product.amount * product.price).toFixed(2)));
		});

		let deci = subtotal.toString().split('.')[1];
		subtotal = parseFloat(`${Math.floor(subtotal)}.${deci ? deci?.slice(0, 2) : '00'}`);
	}
</script>

<div class="sidebar relative z-40" transition:fly={{ x: 250, opacity: 1 }}>
	<div class="cart-list">
		<div class="flex justify-between">
			<p>Cart</p>
			<p on:click={() => hideSidebar()} class=" cursor-pointer">x</p>
		</div>
		{#each $cartStore.cartProducts as prod}
			<CartProduct product={prod} {handleClick} />
		{/each}
	</div>

	<div class="bottom">
		<div class="subtotal">
			<p class="font-light">SUBTOTAL</p>
			<p class=" ">ETB {subtotal}</p>
		</div>
		<button
			class="w-full bg-[#d6cb6b] border-none rounded p-[15px] pointer hover:bg-[#b9b063] transition ease-in-out"
			>Checkout</button
		>
	</div>
</div>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		padding: 2rem 1rem 0.6rem;

		background: #fff;
		overflow-y: auto;
		width: 25rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.subtotal {
		display: flex;
		justify-content: space-between;
	}
	.checkout {
	}

	.checkout:hover {
		background: hsl(54, 37%, 53%);
	}
</style>
