<script lang="ts">
	export let variant: 'default' | 'compact' | 'wide' = 'default';
	export let animate: boolean = true;
</script>

<div
	class="card card__background {variant}"
	class:animate-fade-in-up={animate}
	data-testId="card-rendered"
>
	<slot />
</div>

<style>
	.card {
		height: auto;
		padding: 2rem;
		position: relative;
		width: 100%;
		max-width: 100%;
	}

	/* Mobile */
	@media (max-width: 639px) {
		.card {
			width: 92%;
			margin: 0 auto 1.5rem;
		}
	}

	/* Tablet and up */
	@media (min-width: 640px) {
		.card {
			width: 384px;
			margin-bottom: 1.5rem;
		}

		.card.wide {
			width: 100%;
			max-width: 800px;
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		.card {
			width: 420px;
			padding: 2.5rem;
		}

		.card.wide {
			width: 100%;
			max-width: 1000px;
		}

		.card.compact {
			width: 320px;
			padding: 1.5rem;
		}
	}
</style>
