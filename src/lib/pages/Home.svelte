<script>
	import Balance from "../components/Balance.svelte";
	import Grid from "../organisms/Grid.svelte";
	import { data, details } from "./../../stores/data.js";

	let { goal, balance } = $data;

	balance = $details.reduce((a, b) => a + b.number, 0);
</script>

<Balance {goal} />
<Grid />
