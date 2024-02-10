<script>
	import { onMount } from 'svelte';
	import { FireFunc } from '../firebase/firebase';
	const { fetchAllVerifiedProducts, deleteVerified } = FireFunc;

	let orders = [];

	onMount(async () => {
		orders = await fetchAllVerifiedProducts();

		console.log(orders);
	});
</script>

<div>
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
				<button class=" btn btn-neutral btn-sm my-4 mx-5">Delete It</button>
			</div>
		</div>
	{/each}
</div>
