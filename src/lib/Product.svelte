<script>
	export let product;
	console.log(product);
</script>

<div class="  flex flex-col items-center">
	<img src={product.image} alt={product.name + ' image '} class=" p-8" />
	<p>{product.name}</p>
	<p class=" text-sm font-light tracking-widest">ETB {product.price}</p>

	<button
		class=" font-light tracking-widest text-xl m-3 w-full bg-[#d6cb6b] border-none rounded p-[10px] pointer hover:bg-[#aea55a] transition ease-in-out"
		>VIEW PRODUCT</button
	>
</div>
