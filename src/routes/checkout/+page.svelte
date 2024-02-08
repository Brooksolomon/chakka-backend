<script>
	import { FireFunc } from '../../lib/firebase/firebase';
	import cartStore from '../../stores/cartStore';
	import CartProduct from '../../lib/CartProduct.svelte';
	function submitForm(event) {
		event.preventDefault();
	}

	const handleClick = (id, task) => {
		const newList = $cartStore.cartProducts
			.filter((product) => !(product.id === id && task === 'decr' && product.amount === 1))
			.map((product) => {
				if (product.id === id) {
					return {
						...product,
						amount:
							task === 'incr'
								? product.amount + 1
								: product.amount > 1
									? product.amount - 1
									: product.amount
					};
				} else {
					return product;
				}
			});

		console.log('newList', newList);
		localStorage.setItem('cart_list', JSON.stringify(newList));
		cartStore.update((curr) => {
			return {
				...curr,
				cartProducts: newList
			};
		});
	};

	let subtotal = 0;
	$: {
		subtotal = 0;
		$cartStore.cartProducts.map((product) => {
			subtotal += Number(parseFloat((product.amount * product.price).toFixed(2)));
		});

		let deci = subtotal.toString().split('.')[1];
		subtotal = parseFloat(`${Math.floor(subtotal)}.${deci ? deci?.slice(0, 2) : '00'}`);
	}
</script>

<div class="flex items-center justify-center h-screen flex-col-reverse lg:flex-row">
	<form class="w-full max-w-lg" method="post" action="?/paymentInit">
		<h1 class="text-4xl my-10 mx-4 text-center">chakka origins payment detail</h1>
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
				<input
					required
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
					type="text"
					placeholder="first name"
					name="firstName"
				/>
			</div>
			<div class="w-full md:w-1/2 px-3">
				<input
					required
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
					type="text"
					placeholder="last name"
					name="lastName"
				/>
			</div>
		</div>
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<input
					required
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
					type="email"
					placeholder="email"
					name="email"
				/>
			</div>
		</div>
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<input
					required
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
					type="phone"
					placeholder="phone"
					name="phone"
				/>
			</div>
		</div>
		<div class="flex flex-wrap -mx-3 mb-2">
			<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-state"
				>
					City
				</label>
				<div class="relative">
					<select
						class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
						name="city"
					>
						<option>Addis Ababa</option>
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
			</div>
			<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-state"
				>
					SubCity
				</label>
				<div class="relative">
					<select
						class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
						name="subCity"
					>
						<option>Addis ketema</option>
						<option>Akaki kaliti</option>
						<option>Arada</option>
						<option>Bole</option>
						<option>Gulele</option>
						<option>Kirkos</option>
						<option>Kolfe Keraino</option>
						<option>Lideta</option>
						<option>Nifas silk lafto</option>
						<option>Yeka</option>
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
			</div>
		</div>
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<textarea
					required
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
					type="text"
					placeholder="area description"
					name="description"
				></textarea>
			</div>
		</div>
		<div class=" w-full bg-red-500 flex items-center">
			<button
				class="bg-transparent hover:bg-blue-500 text-blue-700 font-extrabold hover:text-white py-2 px-4 ml-48 border border-blue-500 hover:border-transparent rounded"
				type="submit"
			>
				Pay now
			</button>
		</div>
		<input type="hidden" value={subtotal} name="price" />
	</form>
	<div>
		{#each $cartStore.cartProducts as prod}
			<CartProduct product={prod} {handleClick} source="checkout" />
		{/each}

		<div class="subtotal m-20 ml-80">
			<p class="font-light">TOTAL</p>
			<p class=" ">ETB {subtotal}</p>
		</div>
	</div>
</div>
