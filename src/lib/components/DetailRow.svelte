<script>
	import { format } from "./../../scripts.js";
	import ChartLine from "./../atoms/ChartLine.svelte";
	export let props = {
		title: "Total Title",
		number: 0,
		percent: 0,
		hightlight: false,
	};

	let { title, number, percent, hightlight } = props;
</script>

<div class="w-64 m-3 relative" class:hightlight>
	<h6>{title}</h6>
	<div class="data">
		<p class="euros">{format(number)}</p>

		<ChartLine />

		<p class="percent">{percent}</p>
	</div>
</div>

<style>
	.percent {
		color: var(--secondary);
		font-size: 1em;
		margin-left: 1rem;
	}
	.hightlight:after {
		content: "";
		background: var(--secondary);
		position: absolute;
		width: 1px;
		height: 100%;
		top: 0;
		left: -20px;
	}

	.data {
		display: flex;
		justify-content: center;
		flex-direction: row;
	}
</style>
