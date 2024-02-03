<script>
	import { PlusCircle, PencilLine, Password } from 'phosphor-svelte';
	import dashboardStore from '../stores/dashboardStore';

	const returnTabClass = (tabName) => {
		if (tabName === $dashboardStore.openTab) {
			return;
		}
		return '';
	};

	const selectedTabClass = 'bg-[#2b3440] text-slate-400';
	const changeTab = (tabName) => {
		dashboardStore.update((curr) => {
			return {
				...curr,
				openTab: tabName
			};
		});
	};
</script>

<ul class="menu bg-base-100 w-56 rounded-box">
	<li class="p-3" on:click={() => changeTab('newProduct')}>
		<a class={$dashboardStore.openTab === 'newProduct' ? selectedTabClass : ''}>
			<PlusCircle />
			New Product
		</a>
	</li>
	<li class="p-3" on:click={() => changeTab('editProduct')}>
		<a class={$dashboardStore.openTab === 'editProduct' ? selectedTabClass : ''}>
			<PencilLine />
			Edit Product
		</a>
	</li>
	<li class="p-3" on:click={() => changeTab('changePassword')}>
		<a class={$dashboardStore.openTab === 'changePassword' ? selectedTabClass : ''}>
			<Password />
			Change Password
		</a>
	</li>
</ul>
