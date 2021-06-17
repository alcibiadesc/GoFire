<script>
	export let props = {
		icon: "menu",
		style: "primary",
	};

	export let current = "profile";

	let { icon, style } = props;
	export let onClick = () => console.log("click");
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
		display: grid;
		place-items: center center;
		width: 1.5rem;
	}

	.tertiary:hover {
		filter: invert(52%) sepia(73%) saturate(4792%) hue-rotate(343deg)
			brightness(92%) contrast(99%);
	}

	img {
		width: 2rem;
		height: 2rem;
	}

	.selected {
		background: linear-gradient(to bottom, #202227, var(--background));
		border-radius: 50%;
	}
	.selected__icon {
		filter: invert(52%) sepia(73%) saturate(4792%) hue-rotate(343deg)
			brightness(92%) contrast(99%);
	}
</style>
