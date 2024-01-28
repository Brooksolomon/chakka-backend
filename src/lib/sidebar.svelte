<script>
	import { fly } from 'svelte/transition';
	import CartProduct from './CartProduct.svelte';

	export let show = false;

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

	const handleClick = (id, task) => {
		const newList = products.map((product) => {
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
			}
			return product;
		});

		products = newList;
	};

	let subtotal = 0;

	$: {
		subtotal = 0;
		products.map((product) => {
			subtotal += product.amount * product.price;
		});
	}
</script>

{#if show}
	<div class="sidebar" transition:fly={{ x: 250, opacity: 1 }}>
		<div class="cart-list">
			{#each products as prod}
				<CartProduct product={prod} {handleClick} />
			{/each}
		</div>

		<div class="bottom">
			<div class="subtotal">
				<p>SUBTOTAL</p>
				<p class=" font-semibold">{subtotal}</p>
			</div>
			<button class="checkout">Checkout</button>
		</div>
	</div>
{/if}

<style>
	.sidebar {
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		padding: 2rem 1rem 0.6rem;
		border-left: 1px solid #aaa;
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
		width: 100%;
		background: hsl(53.83deg 56.61% 62.94%);
		border: none;
		border-radius: 5px;
		padding: 15px;
		transition: cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
		cursor: pointer;
	}

	.checkout:hover {
		background: hsl(54, 37%, 53%);
	}
</style>
