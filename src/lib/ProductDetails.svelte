<script>
	import { onMount } from 'svelte';
	import productStore from '../stores/productStore';
	import cartStore from '../stores/cartStore';
	let amount = 0;
	export let product;

	const handleAddToCart = () => {
		cartStore.update((curr) => {
			return {
				...curr,
				cartProducts: [
					...curr.cartProducts.filter((x) => x.id !== product.id),
					{
						...product,
						amount: amount
					}
				]
			};
		});

		localStorage.setItem('cart_list', JSON.stringify($cartStore.cartProducts));
		console.log(JSON.parse(localStorage.getItem('cart_list')));
	};
</script>

<div class="p-5 flex flex-col md:flex-row">
	<div
		class="carousel carousel-center p-8 space-x-4 bg-transparent rounded-box w-[560rem] h-[30rem]"
	>
		{#each product.imageURL as img}
			<div class="carousel-item">
				<img src={img} class="rounded-box object-cover" />
			</div>
		{/each}
	</div>

	<div class="flex flex-col items-left mx-5">
		<p class=" text-xl my-5 ">{product.name}</p>
		<p class="mb-4" >ETB {product.price}</p>
		
		<div class="flex items-center">
			<input
				type="number"
				class=" p-2 w-[3rem] h-[3rem] bg-white outline-none border-2 border-slate-500"
				bind:value={amount}
			/>

			<form method="dialog">

				<button
					on:click={handleAddToCart}
					for="product_details"
					class="btn font-light tracking-widest text-l bg-[#d6cb6b]  border-none rounded-none p-[10px] px-[3rem] pointer hover:bg-[#aea55a] transition ease-in-out text-slate-800 h-[3rem]"
					disabled = '{!amount}'
					>ADD TO CART</button
				>
				
			</form>
		</div>
		<p class="mt-10">{product.description}</p>

	</div>
</div>
