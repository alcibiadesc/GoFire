<script>
	import { format } from "./../../scripts.js";
	export let goal = 0;
	export let road = 0;
</script>

<div class="goal  float-right bg-red-500 p-5 ">
	<img class="m-auto" src="icons/goal.svg" alt="goal" />

	<p class="euros text-sm">{format(road)}</p>

	<h6 class="euros text-xs">/ {format(goal)}</h6>
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
