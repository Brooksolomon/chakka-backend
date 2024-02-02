<script>
	import {FireFunc} from '../../lib/firebase/firebase'
	function submitForm(event) {
		event.preventDefault();
	}

</script>

<div class="flex items-center justify-center h-screen">
	<form class="w-full max-w-lg" method="post" action="?/paymentInit">
		<h1 class="text-4xl my-10 mx-4">chakka origins payment detail</h1>
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
		<button
			class="bg-transparent hover:bg-blue-500 text-blue-700 font-extrabold hover:text-white py-2 px-4 ml-48 border border-blue-500 hover:border-transparent rounded"
			type="submit"
		>
			Pay now
		</button>
		
	</form>

	<button
			class="bg-transparent hover:bg-blue-500 text-blue-700 font-extrabold hover:text-white py-2 px-4 ml-48 border border-blue-500 hover:border-transparent rounded"
			on:click={() =>{FireFunc.loginFunction("adminuser","12345678")}}
		>
			 fetch admin
		</button>

</div>

