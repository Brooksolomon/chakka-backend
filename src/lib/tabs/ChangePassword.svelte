<script>
	import { FireFunc } from '../../lib/firebase/firebase';

	const { changeAdminInformation } = FireFunc;

	const formData = {
		username: '',
		password: ''
	};
	const handleClick = async () => {
		const { username, password } = formData;
		try {
			await changeAdminInformation(username, password);
		} catch (error) {
			console.log('error happened', error);
		}
	};
</script>

<form action="" class="flex flex-col px-[5rem] md:px-[3rem] lg:px-[10rem] xl:px-[15rem]">
	<p class=" font-extrabold text-xl text-center">Change Password</p>
	<input type="text" placeholder="Username" class="input my-5" bind:value={formData.username} />
	<input type="text" placeholder="New Password" class="input my-5" bind:value={formData.password} />
	<button on:click={handleClick} class="btn btn-neutral">Change</button>
</form>
