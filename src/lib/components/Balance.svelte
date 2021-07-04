<script>
	import { format } from "./../../scripts.js";
	import Goal from "./../atoms/Goal.svelte";
	import Card from "../atoms/Card.svelte";
	import { user } from "./../../stores/user.js";
	import { goal } from "./../../stores/goal.js";

	export let balance = 0;
	$: name = $user.displayName ? $user.displayName.split(" ")[0] : "crack";
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

	<Goal {balance} goal={$goal} />
</Card>
