<script>
	import { onMount } from 'svelte';
	import productStore from '../stores/productStore';
	import cartStore from '../stores/cartStore';
	let amount = 0;

	const handleAddToCart = () => {
		cartStore.update((curr) => {
			return {
				...curr,
				cartProducts: [
					...curr.cartProducts,
					{
						...$productStore.activeProduct,
						amount: amount
					}
				]
			};
		});

		localStorage.setItem('cart_list', JSON.stringify($cartStore.cartProducts));
		console.log(JSON.parse(localStorage.getItem('cart_list')));
	};

	onMount(() => {
		console.log($cartStore.cartProducts);
	});
</script>

<div class="p-5 flex flex-col">
	<div
		class="carousel carousel-center w-full p-8 space-x-4 bg-transparent rounded-box w-[20rem] h-[20rem]"
	>
		{#each $productStore.activeProduct.images as img}
			<div class="carousel-item">
				<img src={img} class="rounded-box object-cover" />
			</div>
		{/each}
	</div>

	<div class="flex flex-col items-center">
		<p class=" text-xl">{$productStore.activeProduct.name}</p>
		<div class="flex items-center">
			<input
				type="number"
				class=" p-2 w-[5rem] h-[3rem] bg-white outline-none border border-slate-500"
				bind:value={amount}
			/>
			<button
				on:click={handleAddToCart}
				for="product_details"
				class="btn font-light tracking-widest text-xl bg-[#d6cb6b] border-none rounded p-[10px] px-[3rem] pointer hover:bg-[#aea55a] transition ease-in-out text-slate-800 h-[3rem]"
				>ADD TO CART</button
			>
		</div>
	</div>
</div>
