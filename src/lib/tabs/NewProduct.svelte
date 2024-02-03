<script>
	import { FireFunc } from '../firebase/firebase';
	import { v4 as uuid } from 'uuid';
	const { addProduct, addImage } = FireFunc;
	let formData = {};
	const cateogries = ['Cold-Pressed Oils', 'Essential Oils', 'Herbes And Spices'];
	const handleInput = (e) => {
		formData = {
			...formData,
			[e.target.name]: event.target.value
		};
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

	const handlePost = async () => {
		console.log(imgs);
		let { name, source, description, price, cateogry } = formData;
		//const product = await addProduct(uuid(), )
		//await addImage(uuid(), imgs[0].file);
	};
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
		name="description"
		on:input={handleInput}
	/>
	<input type="text" class=" input my-3" placeholder="Price" name="price" on:input={handleInput} />
	<select name="category" id="">
		{#each cateogries as cat}
			<option value={cat}>{cat}</option>
		{/each}
	</select>
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

	<div class="flex justify-center">
		<button on:click={handlePost} class="btn bg-[#d6cb6b] w-[25rem] my-3 hover:bg-[#aea55a]"
			>Post</button
		>
	</div>
</form>

<style>
	* {
		font-weight: 300;
	}
</style>
