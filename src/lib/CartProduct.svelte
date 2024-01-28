<script>
	export let product;
</script>

<div>
	<img src={product.image} alt={product.name + ' image '} />
	<p>{product.name}</p>
	<p>{product.price}</p>
</div>

<style>
	img {
		width: 100px;
		height: 100px;
	}
</style>
