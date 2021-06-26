<script>
	import Balance from "../components/Balance.svelte";
	import Grid from "../organisms/Grid.svelte";
	import Revenue from "./../components/Revenue.svelte";
	import { data } from "./../../stores/data.js";

	let balance = 0;
	let revenue = 0;

	data.subscribe((val) => {
		balance = data.balance();
		revenue = data.balance() - data.revenue();
	});
</script>

<Balance {balance} />
<Revenue {revenue} />
<Grid />
