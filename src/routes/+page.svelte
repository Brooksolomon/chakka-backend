<script>
	import Sidebar from '../lib/Sidebar.svelte';
	let sidebar_show = false;

	const hideSidebar = () => (sidebar_show = false);
</script>

{#if sidebar_show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => (sidebar_show = !sidebar_show)}
		class=" backdrop fixed bg-black/50 w-[100vw] h-[100vh] z-20"
	></div>
	<Sidebar show={sidebar_show} {hideSidebar} />
{/if}
<div class="  relative z-10">
	<button on:click={() => (sidebar_show = !sidebar_show)}>Toggle Sidebar</button>
	<p>HELLO</p>
</div>
