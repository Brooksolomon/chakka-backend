<script>
	export let product;
</script>

<div class="container">
	<img src={product.image} alt={product.name + ' image '} />
	<div class="right-container">
		<p class="product-name">{product.name}</p>
		<div class="bottom-container">
			<div class="counter">
				<button class=" decrement">-</button>
				<p>0</p>
				<button class="increment">+</button>
			</div>
			<p class="product-price">{product.price}</p>
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
