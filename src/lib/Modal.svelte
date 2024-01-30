<script>
	export let id;
</script>

<input type="checkbox" {id} class="modal-toggle" />
<div class="modal" role="dialog">
	<div class="modal-box">
		<slot />
		<div class="modal-action">
			<label for={id} class="btn">Close!</label>
		</div>
	</div>
</div>
