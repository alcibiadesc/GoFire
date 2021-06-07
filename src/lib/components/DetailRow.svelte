<script>
	export let title = "Total title";
	export let number = 0;
	export let percent = 0;
	export let id = 0;
</script>

<div {id} class="w-2/5 m-3">
	<h6>{title}</h6>
	<div class="flex">
		<p class="euros">{number}</p>
		<p class="percent">{percent}</p>
	</div>
</div>

<style>
	.percent {
		color: var(--secondary);
		font-size: 1em;
		margin-left: 1rem;
	}
</style>
