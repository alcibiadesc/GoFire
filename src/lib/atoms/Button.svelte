<script>
	export let prop = {
		icon: "menu",
		style: "primary",
		onClick: () => console.log("click"),
	};

	export let current = "profile";

	let { icon, style, onClick } = prop;
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

		background: var(--card__background);
	}

	.secondary {
		padding: 0.5rem;
		display: grid;
		place-items: center center;
		border-radius: 10px;
	}

	.tertiary {
		width: 1.75rem;
	}

	.selected {
		background: var(--card__background);
		border-radius: 50%;
	}
	.move {
		width: 1.2rem;
	}
	.selected__icon,
	.tertiary:hover,
	.modal:hover,
	.move:hover {
		filter: var(--filter);
	}
</style>
