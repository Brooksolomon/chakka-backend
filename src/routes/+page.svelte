<script>
	import Sidebar from '../lib/Sidebar.svelte';
	let sidebar_show = false;
</script>

<button on:click={() => (sidebar_show = !sidebar_show)}>Toggle Sidebar</button>

<Sidebar show={sidebar_show} />
