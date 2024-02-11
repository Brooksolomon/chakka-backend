<script>
	import { FireFunc } from '../lib/firebase/firebase';
	const { updateProduct, deleteProduct } = FireFunc;
	export let products;
	export let handleCategoryChange;
	let formData = {};

	const handleInput = (e) => {
		formData = {
			...formData,
			[e.target.name]: e.target.value
		};
	};

	const handleUpdate = async (prod) => {
		const updatedProduct = {
			name: formData.name || prod.name,
			description: formData.description || prod.description,
			source: formData.source || prod.source,
			price: formData.price || prod.price
		};

		// call update function here
		await updateProduct(prod.id, updatedProduct);
		// then call handleCategoryChange() function to update the form with the latest change if necessary
	};

	const handleDelete = async (prod) => {
		await deleteProduct(prod.id);
	};
</script>

<div class=" m-5">
	{#if products.length}
		{#each products as prod}
			<div class="collapse collapse-plus bg-base-200">
				<input
					type="radio"
					name="my-accordion-3"
					checked="checked"
					on:input={() => console.log('changed')}
				/>
				<div class="collapse-title text-xl font-medium flex items-center">
					<img src={prod.imageURL[0]} class=" w-[2rem] h-[2rem] rounded-full object-cover" alt="" />
					<span class=" mx-2">{prod.name}</span>
				</div>
				<div class="collapse-content">
					<input
						type="text"
						class=" input my-3 w-9/12"
						value={prod.name}
						placeholder="Name"
						name="name"
						on:input={handleInput}
					/>
					<input
						value={prod.source}
						type="text"
						class=" input my-3 w-9/12"
						placeholder="Source"
						name="source"
						on:input={handleInput}
					/>
					<input
						value={prod.description}
						type="text"
						class=" input my-3 w-9/12"
						placeholder="Description"
						name="description"
						on:input={handleInput}
					/>
					<input
						type="text"
						class=" input my-3 w-9/12"
						value={prod.price}
						placeholder="Price"
						name="price"
						on:input={handleInput}
					/>

					<div>
						<button on:click={() => handleUpdate(prod)} class=" btn btn-neutral px-7 btn-sm"
							>Update</button
						>
						<button on:click={() => handleDelete(prod)} class=" btn btn-error px-7 btn-sm"
							>Delete</button
						>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>
