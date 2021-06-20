<script>
	import { format } from "./../../scripts.js";
	import Goal from "./../atoms/Goal.svelte";
	import Card from "../atoms/Card.svelte";
	import { user } from "./../../stores/data.js";

	export let balance = 100;
	export let goal = 100_000;
	let road = goal - balance;

	let name = $user.name ? $user.name.split(" ")[0] : "crack";
</script>

<Card>
	<h1>
		Hola {name}
	</h1>
	<h3>Bienvenido de nuevo</h3>

	<h3 class="mt-8">Balance</h3>
	<p class="euros">
		{format(balance)}
	</p>

	<Goal {balance} {goal} {road} />
</Card>
