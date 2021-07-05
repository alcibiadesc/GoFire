<script>
	export let img = "icons/user.svg";
	export let onClick = () => console.log("click avatar");
</script>

<button on:click={onClick}>
	<img
		class="w-12 h-12 rounded-full {img === 'icons/user.svg' ? 'filter' : ''}"
		src={img}
		alt="Avatar"
	/>
</button>

<style>
	.filter {
		filter: var(--filter);
	}
</style>
