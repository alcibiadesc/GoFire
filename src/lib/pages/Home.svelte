<script>
	import Balance from "../components/Balance.svelte";
	import Grid from "../organisms/Grid.svelte";
	import Revenue from "./../components/Revenue.svelte";
	import { goal } from "./../../stores/goal.js";
	import { details } from "./../../stores/data.js";

	let balance = details.balance();
	let revenue = details.balance() - details.revenue();
</script>

<Balance goal={$goal} {balance} />
<Revenue {revenue} />
<Grid />
