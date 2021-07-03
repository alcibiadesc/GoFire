<script>
	import Balance from "../components/Balance.svelte";
	import Grid from "../organisms/Grid.svelte";
	import Revenue from "./../components/Revenue.svelte";
	import { data } from "./../../stores/data.js";

	let balance = 0;
	let revenue = 0;
	let percent = 0;

	data.subscribe((val) => {
		if (val) {
			balance = data.balance();
			revenue = data.balance() - data.revenue() - data.detectNoSavings();
			percent =
				(data.balance() - data.revenue() - data.detectNoSavings()) /
				data.revenue();
		}
	});
</script>

<Balance {balance} />

<Revenue {revenue} {percent} />
<Grid />
