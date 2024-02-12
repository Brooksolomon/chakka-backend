<script>
	import { onMount } from 'svelte';
	import { fly, fade, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import uiStore from '../stores/uiStore';
	onMount(() => {
		let timeout = setTimeout(() => {
			uiStore.update((curr) => {
				return {
					...curr,
					toast: {
						...curr.toast,
						on: false
					}
				};
			});
		}, 2000);

		return () => {
			clearTimeout(timeout);
		};
	});
</script>

<div
	class=" bg-neutral h-[4rem] flex items-center justify-center fixed right-8 bottom-8 rounded p-3 px-6 min-w-[6rem]"
	transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}
>
	<p class="  text-slate-300">{$uiStore.toast.message}</p>
</div>
