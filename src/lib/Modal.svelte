<script>
	export let id;
</script>

<dialog id={`my_modal_${id}`} class="modal bg-white">
	<div class="modal-box w-11/12 max-w-5xl bg-white">
		<slot />
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
