<script>
	import { FireFunc } from '../../lib/firebase/firebase';
	const { loginFunction } = FireFunc;

	let formData = {};
	const handleLogin = async () => {
		let { username, password } = formData;
		if (!username || !password) {
			return;
		}
		const loggedIn = await loginFunction(username, password);

		// do whatever
	};
	const handleChange = (e) => {
		formData = {
			...formData,
			[e.target.name]: e.target.value
		};
	};
</script>

<div class="rounded flex flex-col p-5">
	<input
		on:input={handleChange}
		type="text"
		class="input m-3 bg-base-300"
		placeholder="Enter username"
		autocomplete="off"
		name="username"
	/>
	<input
		on:input={handleChange}
		type="password"
		id=""
		class="input bg-base m-3 bg-base-300"
		name="password"
		placeholder="Enter password"
	/>
	<button on:click={handleLogin} class="btn m-3 font-medium bg-[#d6cb6b] hover:bg-[#aea55a]"
		>Login</button
	>
</div>
