<script lang="ts">
	import { landing } from '../../stores/landing';
	import { t } from '../../i18n/i18n';

	export let toggleGuide: () => void = () => {};
</script>

<div class="landing-container">
	<div class="landing-content">
		<img class="logo" src="/icons/gofire.svg" alt="GoFire logo" />

		<h1 class="title">{$t('LANDING.TITLE')}</h1>

		<p class="description">{$t('LANDING.DESCRIPTION')}</p>

		<div class="actions">
			<button class="btn-primary" on:click={() => ($landing = false)}>
				{$t('LANDING.CALL_TO_ACTION')}
				<img class="arrow-icon" src="/icons/arrow.svg" alt="launch app" />
			</button>

			<button class="btn-secondary" on:click={toggleGuide}>
				{$t('FAQS.READ')}
			</button>
		</div>

		<div class="features">
			<div class="feature">
				<img class="feature-icon" src="/icons/chart.svg" alt="chart" />
				<span>{$t('LANDING.FEATURES.ADD_INVEST')}</span>
			</div>
			<div class="feature">
				<img class="feature-icon" src="/icons/tune.svg" alt="settings" />
				<span>{$t('LANDING.FEATURES.CUSTOMIZE')}</span>
			</div>
			<div class="feature">
				<img class="feature-icon" src="/icons/highlight.svg" alt="goal" />
				<span>{$t('LANDING.FEATURES.ADD_GOAL')}</span>
			</div>
		</div>
	</div>
</div>

<style>
	.landing-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 80vh;
		padding: 2rem;
		width: 100%;
	}

	.landing-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 600px;
		gap: 1.5rem;
	}

	.logo {
		width: 100px;
		height: 100px;
		border-radius: 24px;
		box-shadow: 0 8px 32px rgba(232, 76, 43, 0.3);
	}

	.title {
		font-size: 1.75rem;
		line-height: 1.3;
		max-width: 500px;
	}

	.description {
		color: var(--tertiary);
		font-size: 1.1rem;
		line-height: 1.6;
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 300px;
		margin-top: 1rem;
	}

	.btn-primary {
		background: var(--secondary);
		color: white;
		font-weight: 600;
		font-size: 1.1rem;
		padding: 1rem 2rem;
		border-radius: 16px;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		transition: all 0.2s ease;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(232, 76, 43, 0.4);
	}

	.arrow-icon {
		width: 20px;
		height: 20px;
	}

	.btn-secondary {
		background: transparent;
		color: var(--tertiary);
		font-weight: 500;
		padding: 0.75rem 1.5rem;
		border-radius: 12px;
		border: 1px solid var(--border-color);
		transition: all 0.2s ease;
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--primary);
	}

	.features {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 2rem;
		width: 100%;
	}

	.feature {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background: var(--card__background);
		border-radius: 12px;
		border: 1px solid var(--border-color);
		color: var(--primary);
		font-weight: 500;
	}

	.feature-icon {
		width: 1.5rem;
		height: 1.5rem;
		filter: brightness(0) invert(1);
		opacity: 0.9;
	}

	/* Desktop Layout */
	@media (min-width: 1024px) {
		.landing-content {
			max-width: 700px;
		}

		.logo {
			width: 120px;
			height: 120px;
		}

		.title {
			font-size: 2.5rem;
		}

		.description {
			font-size: 1.25rem;
		}

		.actions {
			flex-direction: row;
			max-width: 100%;
			justify-content: center;
		}

		.btn-primary,
		.btn-secondary {
			width: auto;
		}

		.features {
			flex-direction: row;
			justify-content: center;
		}

		.feature {
			flex: 1;
			max-width: 200px;
			flex-direction: column;
			text-align: center;
			padding: 1.5rem;
		}

		.feature-icon {
			width: 2.5rem;
			height: 2.5rem;
		}
	}
</style>
