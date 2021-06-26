<script>
	import Balance from "../components/Balance.svelte";
	import Grid from "../organisms/Grid.svelte";
	import Revenue from "./../components/Revenue.svelte";
	import { data } from "./../../stores/data.js";

	let balance = data.balance();
	let revenue = data.balance() - data.revenue();
</script>

<Balance {balance} />
<Revenue {revenue} />
<Grid />
