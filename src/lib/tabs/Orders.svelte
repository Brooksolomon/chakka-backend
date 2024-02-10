<script>
	import { onMount } from 'svelte';
	import { FireFunc } from '../firebase/firebase';
	const { fetchAllCompletedOrders, fetchAllIncompletedOrders, completeOrder } = FireFunc;

	let completedOrders = [];
	let incompleteOrders = [];
	let mode = '';
	let orders = [];
	onMount(async () => {});

	const handleModeChange = async (e) => {
		mode = e.target.value;

		if (mode === 'complete' && !completedOrders.length) {
			completedOrders = await fetchAllCompletedOrders();
			orders = completedOrders;
		} else if (mode === 'incomplete' && !incompleteOrders.length) {
			incompleteOrders = await fetchAllIncompletedOrders();
			orders = incompleteOrders;
		} else if (mode === 'complete') {
			orders = completedOrders;
		} else if (mode === 'incomplete') {
			orders = incompleteOrders;
		} else {
			return;
		}
	};

	const handleCompleteOrder = async (txn) => {
		try {
			await completeOrder(txn);
		} catch (error) {
			console.log('error completing order', error.message);
		}
	};
</script>

<div>
	<select name="" id="" on:change={handleModeChange} class=" select select-warning">
		<option value="complete">See Completed</option>
		<option value="incomplete">See Incomplete</option>
	</select>

	{#each orders as order}
		<div class="collapse collapse-plus bg-base-200">
			<input type="radio" name="my-accordion-3" />
			<div class="collapse-title text-xl font-medium flex items-center">
				<span class=" mx-2">{order.firstName} {order.lastName}</span>
			</div>
			<div class="collapse-content">
				<p>Description : <span class=" font-bold">{order.description}</span></p>
				<p>Email : <span class="font-bold">{order.email}</span></p>
				<p>Price Before Tax : <span class="font-bold">{order.price_Before_tax}</span></p>
				<p>Subcity : <span class="font-bold">{order.subCity}</span></p>

				<ul class="menu bg-base-200 w-56 rounded-box">
					<p class=" text-xl font-bold my-4">Products</p>
					{#each order.order as ord}
						<li class=" ">
							<a class=" flex justify-between bg-base-200">
								<span>{ord.name}</span>
								<span class=" badge badge-neutral w-[20px] h-[20px]">{ord.amount}</span>
							</a>
						</li>
					{/each}
				</ul>
				{#if order.completed === false}
					<button
						on:click={async () => await handleCompleteOrder(order.txnReference)}
						class=" btn btn-neutral btn-sm my-4 mx-5">Mark as complete</button
					>
				{/if}
			</div>
		</div>
	{/each}
</div>
