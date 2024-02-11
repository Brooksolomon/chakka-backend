<div class="navbar bg-[#f7f3ec] sticky top-0 z-50 flex justify-between w-full">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<!-- svelte-ignore a11y-missing-attribute -->
				<li><a>Home</a></li>
				<li>
					<a>Products</a>
					<ul class="p-2 bg-inherit">
						<li><a href="/essential-oils">Essential Oils</a></li>
						<li><a href="/cold-pressed-oils">Cold-Pressed Oils</a></li>
						<li><a href="/herbs-and-spices">Herbs and Spices</a></li>
					</ul>
				</li>
				<li><a href="/plants">Plants</a></li>
				<li><a href="/sustainable-source">Sustainable Source</a></li>
			</ul>
		</div>
		<img src="/Chakka.png" alt="" width="20" class=" w-[8rem] ml-6" />
	</div>
	<div class="navbar-center hidden">
		<button></button>
		<button></button>
		<button></button>
	</div>
	<div class="navbar-end hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li class="text-xl"><a>Home</a></li>
			<li>
				<details>
					<summary class="text-xl">Products</summary>
					<ul class="p-2 w-60 bg-base-200">
						<li><a>All Products</a></li>
						<li><a>Essential Oils</a></li>
						<li><a>Cold-Pressed Oils</a></li>
						<li><a>Herbs and Spices</a></li>
					</ul>
				</details>
			</li>
			<li class="text-xl"><a>Plants</a></li>
			<li class="text-xl"><a>Sustainable Source</a></li>
		</ul>
	</div>
</div>
