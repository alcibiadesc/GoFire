<script>
	const icon = {
		menu: "icons/menu.svg",
	};

	export let type = "menu";
	export let style = "primary";
</script>

<div class={style}>
	<button>
		<img src={icon[type]} alt="" />
	</button>
</div>

<style>
	.primary {
		padding: 0.5rem;
		display: grid;
		place-items: center;
		border-radius: 10px;
		background: linear-gradient(to bottom, #202227, var(--background));
	}

	img {
		width: 2rem;
		height: 2rem;
	}
</style>
