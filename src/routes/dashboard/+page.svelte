<script>
	import TabList from '../../lib/TabList.svelte';
	import EditProduct from '../../lib/tabs/EditProduct.svelte';
	import NewProduct from '../../lib/tabs/NewProduct.svelte';
	import ChangePassword from '../../lib/tabs/ChangePassword.svelte';

	import dashboardStore from '../../stores/dashboardStore';
	import { goto } from '$app/navigation';
	
	if(sessionStorage.getItem("loggedin") == null) goto('/login');
</script>

<div class=" h-[100%] flex">
	<div class="dashboard-left flex-[0.1]">
		<TabList />
	</div>
	<div class=" w-full h-[100%] flex-[0.9] mx-10 overflow-auto">
		{#if $dashboardStore.openTab === 'newProduct'}
			<NewProduct />
		{:else if $dashboardStore.openTab === 'editProduct'}
			<EditProduct />
		{:else if $dashboardStore.openTab === 'changePassword'}
			<ChangePassword />
		{/if}
	</div>
</div>
