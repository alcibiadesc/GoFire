<script>
	import { format, formatPercent } from "./../../scripts.js";

	export let revenue = 0;
	export let percent = 0;
	export let props = {
		title: "Beneficios",
		hightlight: true,
	};

	let { title, hightlight } = props;
</script>

<div class="w-64 m-3 relative m-6" class:hightlight>
	<h6 class="mb-1">{title}</h6>
	<div class="data">
		<p class="euros">{format(revenue)}</p>
		<p class="percent">{formatPercent(isNaN(percent) ? 0 : percent)}</p>
	</div>
</div>

<style>
	.title {
		border: none;
		width: 100%;
		color: var(--tertiary);
	}
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
		justify-content: left;
		flex-direction: row;
	}

	button {
		color: var(--tertiary);
	}
</style>
