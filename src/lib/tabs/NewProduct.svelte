<script>
	import { FireFunc } from '../firebase/firebase';
	import { v4 as uuid } from 'uuid';
	const { addProduct, addImage } = FireFunc;
	import { invalidateAll } from '$app/navigation';
	import uiStore from '../../stores/uiStore';
	let formData = {
		name: '',
		source: '',
		description: '',
		price: '',
		category: ''
	};
	const cateogries = ['Cold-Pressed Oils', 'Essential Oils', 'Herbs And Spices'];
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

			// Update your `imgs` array with the base64 representation
			imgs = imgs.map((img, i) => {
				if (index === i) {
					return { file: file, base64Img };
				} else {
					return img;
				}
			});
		};

		reader.readAsDataURL(file);
	};
	let posted = false;
	const handlePost = async (event) => {
		setTimeout(() => {
			posted = false;
		}, 3000);

		let { name, source, description, price, category } = formData;
		const productId = uuid();

		if (!name || !source || !description || !price || !category || !imgs.length) {
			uiStore.update((curr) => {
				return {
					...curr,
					toast: {
						on: true,
						message: 'Make sure all fields are filled'
					}
				};
			});
			return;
		}
		uiStore.update((curr) => {
			return {
				...curr,
				loading: true
			};
		});
		try {
			await addProduct(productId, name, source, price, description, category);
			imgs.forEach(async (img, i) => {
				try {
					await addImage(productId, img.file, i);
					posted = true;
					uiStore.update((curr) => {
						return {
							...curr,
							loading: false
						};
					});
					formData = {
						name: '',
						source: '',
						description: '',
						price: '',
						category: ''
					};
				} catch (error) {
					uiStore.update((curr) => {
						return {
							...curr,
							loading: false
						};
					});
					console.log('image upload error', error);
				}
			});
		} catch (error) {
			uiStore.update((curr) => {
				return {
					...curr,
					loading: false
				};
			});
			console.log(error.message);
		}
	};
</script>

<form action="" class="flex flex-col mx-2 items-center">
	<p class=" text-center font-extrabold tracking-wider text-xl">New Product</p>
	<input
		type="text"
		class=" input my-3 w-9/12"
		placeholder="Name"
		bind:value={formData.name}
		name="name"
		on:input={handleInput}
	/>
	<input
		type="text"
		class=" input my-3 w-9/12"
		placeholder="Source"
		bind:value={formData.source}
		name="source"
		on:input={handleInput}
	/>
	<input
		type="text"
		class=" input my-3 w-9/12"
		bind:value={formData.description}
		placeholder="Description"
		name="description"
		on:input={handleInput}
	/>
	<input
		type="text"
		class=" input my-3 w-9/12"
		bind:value={formData.price}
		placeholder="Price"
		name="price"
		on:input={handleInput}
	/>
	<div class="relative">
		<select
			name="category"
			bind:value={formData.category}
			on:change={handleInput}
			class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
		>
			<option value="" disabled selected="true">category</option>
			{#each cateogries as cat}
				<option value={cat}>{cat}</option>
			{/each}
		</select>
		<div
			class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
		>
			<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
				><path
					d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
				/></svg
			>
		</div>
	</div>
	<div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
		{#each imgs as img, i}
			{#if img}
				<img src={img.base64Img} alt="" class=" w-[10rem] h-[10rem] object-cover my-5" />
			{:else}
				<input
					on:change={(e) => handleImgChange(e, i)}
					type="file"
					class="file-input file-input-bordered my-4 w-[20rem] mx-[8rem]"
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
{#if posted}
	<div role="alert" class="alert alert-success">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>Product has been added!</span>
	</div>
{/if}

<style>
	* {
		font-weight: 300;
	}
</style>
