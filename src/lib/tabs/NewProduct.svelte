<script>
	import { FireFunc } from '../firebase/firebase';
	const { addProduct } = FireFunc;
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
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			const base64Img = reader.result;
			console.log('base64Img', base64Img);

			// Update your `imgs` array with the base64 representation
			imgs = imgs.map((img, i) => {
				if (index === i) {
					return { file: file, base64Img };
				} else {
					return img;
				}
			});

			console.log('imgs', imgs);
		};

		reader.readAsDataURL(file);
	};

	const handlePost = () => {};
</script>

<form action="" class="flex flex-col mx-2">
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

	<div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
		{#each imgs as img, i}
			{#if img}
				<img src={img.base64Img} alt="" class=" w-[10rem] h-[10rem] object-cover my-5" />
			{:else}
				<input
					on:change={(e) => handleImgChange(e, i)}
					type="file"
					class="file-input file-input-bordered w-full max-w-xs my-4"
				/>
			{/if}
		{/each}
	</div>

	{#if imgs.length < 4}
		<div class="flex justify-start">
			<button on:click={() => (imgs = [...imgs, ''])} class=" btn btn-neutral w-[20rem]"
				>Add Image</button
			>
		</div>
	{/if}

	<div class="flex justify-start">
		<button on:click={handlePost} class="btn bg-[#d6cb6b] w-[20rem] my-3 hover:bg-[#aea55a]"
			>Post</button
		>
	</div>
</form>

<style>
	* {
		font-weight: 300;
	}
</style>
