<script>
	export let product;
	export let handleClick;
	export let source;
</script>

<div class="container flex m-[1rem]">
	<img
		class=" w-[65px] h-[100px] object-cover"
		src={product.images[0]}
		alt={product.name + ' image '}
	/>
	<div class=" m-l-[1rem] w-full m-3">
		<p class=" text-xs">{product.name}</p>
		<div class="flex justify-between items-center mt-5">
			<div class=" flex items-center border border-gray-500 rounded-sm">
				{#if source=="sidebar"}
				<button
					on:click={() => handleClick(product.id, 'decr',0)}
					class="hover:bg-slate-400 transition ease-linear"><span class="m-3">-</span></button
				>
				{/if}
				<p class=" border-r border-l border-gray-500 h-[100%] px-4 font-light">
					<input class="w-10 " disabled={source=='checkout'} bind:value={product.amount}  on:change={() => handleClick(product.id,'change',product.amount)}>
				</p>
				{#if source=="sidebar"}
				<button
					on:click={() => handleClick(product.id, 'incr',0)}
					class="hover:bg-slate-400 transition ease-linear"><span class=" m-3">+</span></button
				>
				{/if}
			</div>
			<p class="product-price font-light">ETB {Number(parseFloat((product.amount * product.price).toFixed(2)))}</p>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		margin: 1rem;
	}
	img {
		width: 65px;
		height: 100px;
		object-fit: cover;
	}
	.right-container {
		margin-left: 1rem;
	}

	.product-name {
		font-size: small;
	}

	.bottom-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.counter {
		display: flex;
		align-items: center;
	}

	.counter * {
		width: 100%;
		height: 100%;
		border: 0.5px solid black;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px 10px 5px 10px;
	}
	.counter button {
		margin: 0;
		background: none;
	}
	.counter p {
		padding: 5px 20px 5px 20px !important;
	}

	.decrement {
		border-bottom-left-radius: 3px;
		border-top-left-radius: 3px;
	}
	.increment {
		border-bottom-right-radius: 3px;
		border-top-right-radius: 3px;
	}
</style>
