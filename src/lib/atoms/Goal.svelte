<script>
	import { format } from "./../../scripts.js";
	export let goal = 0;
	export let road = 0;
	export let balance = 0;

	let checkGoal = () => goal > balance;
</script>

<div class="goal  float-right bg-red-500 p-5 ">
	<img class="m-auto" src="icons/goal.svg" alt="goal" />

	{#if checkGoal()}
		<p class="euros text-sm text-center">a {format(road)}</p>
		<h6 class="euros text-xs text-center">de {format(goal)}</h6>
	{:else}
		<p class="euros text-xs text-center">Objetivo logrado</p>
		<h6 class="euros text-xs text-center">{format(goal)}</h6>
	{/if}
</div>

<style>
	.goal {
		background-color: var(--secondary);
		right: 20px;
		bottom: -3rem;
		height: 8em;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%);
		position: absolute;
	}

	h6 {
		color: var(--primary);
	}
</style>
