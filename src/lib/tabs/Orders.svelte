<script>
	import { onMount } from 'svelte';
	import { FireFunc } from '../firebase/firebase';
	import { CaretCircleDown, CaretDown, ListNumbers, Spinner } from 'phosphor-svelte';
	import { slide } from 'svelte/transition'
	const { fetchAllCompletedOrders, fetchAllIncompletedOrders, completeOrder } = FireFunc;

	let completedOrders = [];
	let incompleteOrders = [];
	let mode = '';
	let orders = [];
	onMount(async () => {});

	const setList = async(mode) =>
	{
		if (mode === 'complete' && !completedOrders.length) {
			completedOrders = await fetchAllCompletedOrders();
			completedOrders.forEach((order) => {
				order['collapsed'] = true
			})
			orders = completedOrders;
		} else if (mode === 'incomplete' && !incompleteOrders.length) {
			incompleteOrders = await fetchAllIncompletedOrders();
			incompleteOrders.forEach((order) => {
				order['collapsed'] = true
			})
			orders = incompleteOrders;
		} else if (mode === 'complete') {
			orders = completedOrders;
		} else if (mode === 'incomplete') {
			orders = incompleteOrders;
		} else {
			return;
		}
	}

	const handleModeChange = async (e) => {
		setList(e.target.value)	
	};
	setList('complete');

	const handleCompleteOrder = async (txn) => {
		try {
			await completeOrder(txn);
		} catch (error) {
			console.log('error completing order', error.message);
		}
	};
</script>

<div>
	<select name="" id="" on:change={handleModeChange} class=" select select-warning" value="complete">
		<option value="complete">See Completed</option>
		<option value="incomplete">See Incomplete</option>
	</select>
	{#each orders as order}
	<div class="w-full rounded-md p-1 transition-all ">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#if order.collapsed}
			<div
			on:click={() => {
				order.collapsed = !order.collapsed
			}}
				in:slide
				class="font-lg flex flex-row items-center justify-between gap-4 rounded-2xl bg-[#d6cb6b] p-4 text-xl">
				<div class="flex flex-row gap-4 justify-center">
					<span
						>
						<CaretCircleDown size="24" />
					</span>
					<h3 class="text-base-200">
						{order.firstName} {order.lastName}
					</h3>
				</div>
				</div>
		{:else}
				<div transition:slide >
					<div on:click={() => {
						order.collapsed = !order.collapsed}} class="font-lg flex flex-row items-center justify-between gap-4 rounded-2xl bg-[#d6cb6b] p-4 text-xl">
						<span
							>
							<CaretDown size="24" />
						</span>
						<h3 class="text-base-200">
							{order.firstName} {order.lastName}
						</h3>
					</div>
					<div class="bg-gray-300 pl-10 rounded-2xl">
						<p>Description : <span class=" font-bold">{order.description}</span></p>
						<p>Email : <span class="font-bold">{order.email}</span></p>
						<p>Phone : <span class="font-bold">{order.phone}</span></p>
						<p>Price Before Tax : <span class="font-bold">{order.price_Before_tax}</span></p>
						<p>City : <span class=" font-bold">{order.city}</span></p>
						<p>Subcity : <span class="font-bold">{order.subCity}</span></p>
		
						<ul class="menu bg-base-200  w-56 rounded-box">
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
		{/if}
	</div> 
	{/each}
</div>
