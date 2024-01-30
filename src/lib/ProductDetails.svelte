<script>
	import { onMount } from 'svelte';
	import productStore from '../stores/productStore';
</script>

<div class="p-5 flex">
	<div
		class="carousel carousel-center max-w-md p-8 space-x-4 bg-transparent rounded-box w-[20rem] h-[20rem]"
	>
		{#each $productStore.activeProduct.images as img}
			<div class="carousel-item">
				<img src={img} class="rounded-box object-cover" />
			</div>
		{/each}
	</div>

	<div class="">
		<p class=" text-xl">{$productStore.activeProduct.name}</p>
		<p>hahahah</p>
	</div>
</div>
