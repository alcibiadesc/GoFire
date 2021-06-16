<script>
	import { format } from "./../../scripts.js";
	import Goal from "./../atoms/Goal.svelte";
	import Card from "../atoms/Card.svelte";
	let name = "crack";

	export let balance = 0;
	export let goal = 100_000;
	let road = goal - balance;
</script>

<Card>
	<h1>
		{`Hola ${name}`}
	</h1>
	<h3>Bienvenido de nuevo</h3>

	<h3 class="mt-8">Balance</h3>
	<p class="euros">
		{format(balance)}
	</p>

	<Goal {balance} {goal} {road} />
</Card>
