<div class="navbar bg-[#f7f3ec] sticky top-0 z-19 flex justify-between w-full">
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
	<div class="navbar-end hidden lg:flex mr-[5rem] ">
		<ul class="menu menu-horizontal px-1 lg:gap-18">
			<li class="text-xl"><a>Home</a></li>
			<li>
				<details>
					<summary class="text-xl">Products</summary>
					<ul class="p-2 w-60 bg-[#f7f3ec]">
						<li><a><b>All Products</b></a></li>
						<li><a href="/essential-oils" data-sveltekit-reload ><b>Essential Oils</b></a></li>
						<li><a href="/cold-pressed-oils" data-sveltekit-reload ><b>Cold-Pressed Oils</b></a></li>
						<li><a href="/herbs-and-spices" data-sveltekit-reload ><b>Herbs and Spices</b></a></li>
					</ul>
				</details>
			</li>
			<li class="text-xl"><a>Plants</a></li>
			<li class="text-xl"><a>Sustainable Source</a></li>
			<li class="text-xl"><a>About</a></li>
			<li class="text-xl"><a>Contact</a></li>
		</ul>
	</div>
</div>
