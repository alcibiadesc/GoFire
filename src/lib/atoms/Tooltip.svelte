<script>
	export let label = "Tooltip";
</script>

<div class="tooltip">
	<slot />
	<span class="tooltiptext">{label}</span>
</div>

<style>
	.tooltip {
		position: relative;
		display: inline-flex;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		min-width: 100px;
		max-width: 200px;
		background: var(--background-secondary);
		color: var(--primary);
		text-align: center;
		border-radius: 8px;
		padding: 0.5rem 0.75rem;
		font-size: 0.8rem;
		font-weight: 500;
		position: absolute;
		z-index: 100;
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		opacity: 0;
		transition: opacity 0.2s ease;
		border: 1px solid var(--border-color);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		white-space: nowrap;
	}

	.tooltip .tooltiptext::after {
		content: "";
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-width: 6px;
		border-style: solid;
		border-color: var(--background-secondary) transparent transparent transparent;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
		opacity: 1;
		transition-delay: 0.5s;
	}
</style>
