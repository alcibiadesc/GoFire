<script>
	import Balance from "../components/Balance.svelte";
	import Grid from "../organisms/Grid.svelte";
	import { goal, details } from "./../../stores/data.js";

	$: balance = details.balance();
</script>

<Balance goal={$goal} {balance} />
<Grid />
