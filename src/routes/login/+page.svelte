<script>
	import { FireFunc } from '../../lib/firebase/firebase';
	import { goto } from '$app/navigation';
	const { loginFunction } = FireFunc;
	let wrong = false;

	let formData = {};
	const handleLogin = async () => {
		let { username, password } = formData;
		if (!username || !password) {
			wrong = true;
			return;
		}
		const loggedIn = await loginFunction(username, password);
		if (loggedIn){
		sessionStorage.setItem("loggedin",true)
		goto('/dashboard')
		wrong = false
		}
		else{
			wrong = true
		}
		

		// do whatever
	};
	const handleChange = (e) => {
		formData = {
			...formData,
			[e.target.name]: e.target.value
		};
	};
</script>

<div class="rounded flex flex-col p-5 items-center justify-center">
	{#if wrong}
		<h1 class="bg-red-200">Wrong Username or password</h1>
	{/if}
	<input
		on:input={handleChange}
		type="text"
		class="input m-3 {wrong ? 'bg-red-400' : 'bg-white-300'} w-64"
		placeholder="Enter username"
		autocomplete="off"
		name="username"
	/>
	<input
		on:input={handleChange}
		type="password"
		id=""
		class="input  m-3 {wrong ? 'bg-red-400' : 'bg-white-300'} w-64"
		name="password"
		placeholder="Enter password"
	/>
	<button on:click={handleLogin} class="btn m-3 w-64 font-medium bg-[#d6cb6b] hover:bg-[#aea55a]"
		>Login</button
	>
</div>
