<script>
	export let props = {
		icon: "menu",
		style: "primary",
		onClick: () => console.log("click"),
	};

	export let current = "profile";

	let { icon, style, onClick } = props;
</script>

<div class={style} on:click class:selected={current === icon}>
	<button on:click={onClick}>
		<img
			class:selected__icon={current === icon}
			src={`icons/${icon}.svg`}
			alt={icon}
		/>
	</button>
</div>

<style>
	img {
		width: 2rem;
		height: 2rem;
	}
	.primary {
		padding: 0.5rem;
		display: grid;
		place-items: center;
		border-radius: 10px;
		background: linear-gradient(to bottom, #202227, var(--background));
	}

	.secondary {
		padding: 0.5rem;
		display: grid;
		place-items: center center;
		border-radius: 10px;
	}

	.tertiary {
		width: 1.5rem;
	}

	.selected {
		background: linear-gradient(to bottom, #202227, var(--background));
		border-radius: 50%;
	}

	.selected:hover {
		display: none;
	}
	.selected__icon,
	.tertiary:hover,
	.secondary:hover {
		filter: var(--filter);
	}
</style>
