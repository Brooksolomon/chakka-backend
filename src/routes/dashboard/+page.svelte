<script>
	import TabList from '../../lib/TabList.svelte';
	import EditProduct from '../../lib/tabs/EditProduct.svelte';
	import NewProduct from '../../lib/tabs/NewProduct.svelte';
	import ChangePassword from '../../lib/tabs/ChangePassword.svelte';

	import dashboardStore from '../../stores/dashboardStore';
</script>

<div class=" h-[100%] flex">
	<div class="dashboard-left flex-[0.1]">
		<TabList />
	</div>
	<div class=" w-full h-[30rem] flex-[0.9] mx-10">
		{#if $dashboardStore.openTab === 'newProduct'}
			<NewProduct />
		{:else if $dashboardStore.openTab === 'editProduct'}
			<EditProduct />
		{:else if $dashboardStore.openTab === 'changePassword'}
			<ChangePassword />
		{/if}
	</div>
</div>
