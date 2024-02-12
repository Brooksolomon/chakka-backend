import { writable } from 'svelte/store';

export default writable({
	sidebarShow: false,
	loading: false,
	toast: {
		on: false
	}
});
