<script>
	export let props = {
		icon: "menu",
		style: "primary",
	};

	export let current = "profile";
	let { icon, style } = props;
</script>

<div class={style} on:click class:selected={current === icon}>
	<button>
		<img
			class:selected__icon={current === icon}
			src={`icons/${icon}.svg`}
			alt=""
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
		place-items: center;
		border-radius: 10px;
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
