<script>
	import Balance from "../components/Balance.svelte";
	import DetailGrid from "../organisms/DetailGrid.svelte";
	import { data } from "./../../stores/data.js";

	let { goal, balance } = $data;
</script>

<Balance {goal} {balance} />
<DetailGrid />
