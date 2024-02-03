<script>
	let formData = {};

	const handleInput = (e) => {
		formData = {
			...formData,
			[e.target.name]: event.target.value
		};

		console.log(formData);
	};

	let imgs = [''];

	const handleImgChange = (e, index) => {
		imgs = imgs.map((img, i) => {
			if (index === i) {
				return e.target.files[0];
			} else {
				return img;
			}
		});

		console.log('img', imgs);
	};
</script>

<form action="" class="flex flex-col">
	<p class=" text-center font-extrabold tracking-wider text-xl">New Product</p>
	<input type="text" class=" input my-3" placeholder="Name" name="name" on:input={handleInput} />
	<input
		type="text"
		class=" input my-3"
		placeholder="Source"
		name="source"
		on:input={handleInput}
	/>
	<input
		type="text"
		class=" input my-3"
		placeholder="Description"
		name="descripton"
		on:input={handleInput}
	/>
	<input type="text" class=" input my-3" placeholder="Price" name="price" on:input={handleInput} />
	{#each imgs as img, i}
		{#if img}
			""
		{:else}
			<input
				on:change={(e) => handleImgChange(e, i)}
				type="file"
				class="file-input file-input-bordered file-input-success w-full max-w-xs my-4"
			/>
		{/if}
	{/each}

	{#if imgs.length < 3}
		<button on:click={() => (imgs = [...imgs, ''])} class=" btn">Add Image</button>
	{/if}
</form>

<style>
	* {
		font-weight: 300;
	}
</style>
