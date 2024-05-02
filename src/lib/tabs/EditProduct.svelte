<script>
	import { onMount } from 'svelte';
	import { FireFunc } from '../../lib/firebase/firebase';
	const { fetchProductWithCategory, fetchImageForProduct, updateProduct,deleteProduct,fetchAllProducts } = FireFunc;
	import ProductAccordion from '../ProductAccordion.svelte';

	import uiStore from '../../stores/uiStore';

	let formData = {};

	$: products = [];

	$: currentPage = 1;
  const itemsPerPage = 3;
  $: startIndex = (currentPage - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;
  

	onMount( async() => {products = [];
		loading = true;
		const fetchedProducts = await fetchAllProducts();
		products = await Promise.all(
			fetchedProducts.map(async (prod) => {
				try {
					const imageURL = await fetchImageForProduct(prod.productID);

					loading = false;
					return {
						...prod,
						id: prod.productID,
						imageURL
					};
				} catch (error) {
					console.log(error);
				}
			})
		);
		
	console.log(products)
	});
	$: currentPageProducts = products.slice(startIndex, endIndex);
	let loading = false;
	
	// const handleCategoryChange = async () => {
	// 	products = [];
	// 	loading = true;
	// 	const fetchedProducts = await fetchProductWithCategory('Essential-oils');
	// 	products = await Promise.all(
	// 		fetchedProducts.map(async (prod) => {
	// 			try {
	// 				const imageURL = await fetchImageForProduct(prod.productID);

	// 				loading = false;
	// 				return {
	// 					...prod,
	// 					id: prod.productID,
	// 					imageURL
	// 				};
	// 			} catch (error) {
	// 				console.log(error);
	// 			}
	// 		})
	// 	);
	// };



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
		uiStore.update((curr) => {
			return {
				...curr,
				loading: true
			};
		});
		// call update function here
		try {
			await updateProduct(prod.id, updatedProduct);
			uiStore.update((curr) => {
				return {
					...curr,
					loading: false,
					toast: {
						on: true,
						type: 'success',
						message: 'Product updated successfully'
					}
				};
			});
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		} catch (error) {
			uiStore.update((curr) => {
				return {
					...curr,
					loading: true,
					toast: {
						on: true,
						type: 'error',
						message: 'Update Failed'
					}
				};
			});
		}
		// then call handleCategoryChange() function to update the form with the latest change if necessary
	};

	const handleDelete = async (prod) => {
		uiStore.update((curr) => {
			return {
				...curr,
				loading: true
			};
		});
		try {
			await deleteProduct(prod.id);
			uiStore.update((curr) => {
				return {
					...curr,
					loading: false,
					toast: {
						on: true,
						type: 'success',
						message: 'Product Deleted'
					}
				};
			});
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		} catch (error) {
			uiStore.update((curr) => {
				return {
					...curr,
					loading: false,
					toast: {
						on: true,
						type: 'error',
						message: 'Delete Failed'
					}
				};
			});
		}
	};
</script>

<div>
	{#if loading}
		<div class="skeleton w-[100%] h-[2rem] rounded mt-3"></div>
		<div class="skeleton w-[60%] h-[2rem] rounded mt-3"></div>
		<div class="skeleton w-[50%] h-[2rem] rounded mt-3"></div>
		<div class="skeleton w-[70%] h-[2rem] rounded mt-3"></div>
		<div class="skeleton w-[100%] h-[2rem] rounded mt-3"></div>
	{/if}

	<div class="overflow-x-auto">
		<table class="table">
		  <!-- head -->
		  <!-- <thead>
			<tr>
			  <th>Name price stoc</th>
			</tr>
		  </thead> -->
		  <tbody>
			<!-- row 1 -->
			{#each currentPageProducts as pd }
			<div class="collapse collapse-plus bg-[#f7f3ec] border border-slate-400 mb-2">
				<input
					type="radio"
					name="my-accordion-3"
					checked="checked"
					on:input={() => console.log('changed')}
				/>
				<div class="collapse-title text-xl font-medium flex items-center justify-between">
			<tr>
				<td>
				  <div class="flex items-center gap-3">
					<div class="avatar">
					  <div class="mask mask-squircle w-12 h-12">
						<img src="{pd.imageURL[0]}" alt="Avatar Tailwind CSS Component" />
					  </div>
					</div>
					<div>
					  <div class="font-bold">{pd.name}</div>
					  <div class="text-sm opacity-50">{pd.category}</div>
					</div>
				  </div>
				</td>
				<td>
				  {pd.price}
				</td>
			  </tr>
			</div>
			  <div class="collapse-content">
				<input
					type="text"
					class=" input my-3 w-9/12"
					value={pd.name}
					placeholder="Name"
					name="name"
					on:input={handleInput}
				/>
				<input
					value={pd.source}
					type="text"
					class=" input my-3 w-9/12"
					placeholder="Source"
					name="source"
					on:input={handleInput}
				/>
				<input
					value={pd.description}
					type="text"
					class=" input my-3 w-9/12"
					placeholder="Description"
					name="description"
					on:input={handleInput}
				/>
				<input
					type="text"
					class=" input my-3 w-9/12"
					value={pd.price}
					placeholder="Price"
					name="price"
					on:input={handleInput}
				/>

				<div>
					<button on:click={() => handleUpdate(pd)} class=" btn btn-neutral px-7 btn-sm"
						>Update</button
					>

					<button on:click={() => handleDelete(pd)} class=" btn btn-error px-7 btn-sm"
						>Delete</button
					>
				</div>
			</div>
		</div>
			{/each}
			
		  </tbody>
		</table>
	  </div>
	  <div class="flex flex-row justify-end">
	  <div class="join grid grid-cols-2 w-[10vw] justify-end items-end ">
		<button class="join-item btn btn-outline" on:click={()=>currentPage-=1} disabled={currentPage === 1}>Previous page</button>
		
		<button class="join-item btn btn-outline" on:click={()=>currentPage+=1 } disabled={currentPage * itemsPerPage >= products.length}>Next</button>
	  </div>
	</div>
	<!-- <ProductAccordion {products} {handleCategoryChange} {loading} /> -->
</div>
