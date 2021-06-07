<script>
	import { format } from "./../../scripts.js";
	let name = "crack";
	let balance = 0;
	let goal = 100000;
	let road = goal - balance;
</script>

<div class="h-auto w-3/5 m-10 card__background p-8 relative">
	<h1>
		{`Hola ${name}`}
	</h1>
	<h3>Bienvenido de nuevo</h3>

	<h3 class="mt-12">Balance</h3>
	<p class="euros">
		{format(balance)}
	</p>

	<div class="goal  float-right bg-red-500 p-5">
		<img class="m-auto" src="icons/goal.svg" alt="goal" />

		<h6 class="euros u">Goal: {format(goal)}</h6>
		<p class="euros">{format(road)}</p>
	</div>
</div>

<style>
	.goal {
		background-color: var(--secondary);
		right: 0;
		bottom: -10;
		height: 12em;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 60%, 0 100%);
		position: absolute;
		right: 0;
		bottom: -5rem;
	}

	h6 {
		color: var(--primary);
	}
</style>
