<script>
	import { format } from "./../../scripts.js";
	import Goal from "./../atoms/Goal.svelte";
	let name = "crack";
	let balance = 0;
	let goal = 100000;
	let road = goal - balance;
</script>

<div
	class="h-auto   sm:w-96 w-9/12 mb-20  shadow-2xl card__background p-8 relative"
>
	<h1>
		{`Hola ${name}`}
	</h1>
	<h3>Bienvenido de nuevo</h3>

	<h3 class="mt-8">Balance</h3>
	<p class="euros">
		{format(balance)}
	</p>

	<Goal {goal} {road} />
</div>
