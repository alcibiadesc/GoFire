<script lang="ts">
	import { formatNum, currency } from '../../i18n/currency';
	import { user } from '../../stores/user.js';
	import { goal } from '../../stores/goal.js';
	import { t } from '../../i18n/i18n';

	export let balance: number = 0;
	$: name = $user?.displayName ? $user.displayName.split(' ')[0] : $t('HOME.GUEST');
	$: progress = $goal > 0 ? Math.min((balance / $goal) * 100, 100) : 0;
	$: hasGoal = $goal > 0;
	$: isComplete = balance >= $goal && $goal > 0;

	let balanceFormatted = '';
	let goalFormatted = '';

	$: currency.subscribe(() => {
		balanceFormatted = formatNum(balance);
		goalFormatted = formatNum($goal);
	});

	// Arc calculation (semicircle from left to right, 180 degrees)
	$: arcLength = 251.2; // π * r * 2 * 0.5 for r=80
	$: filledLength = (arcLength * progress) / 100;
</script>

<div class="balance-card card__background">
	<div class="balance-content">
		<div class="greeting">
			<h1>{$t('HOME.HI')}, {name}</h1>
			<p class="subtitle">{$t('HOME.SUBTITLE')}</p>
		</div>

		<div class="balance-section">
			{#if hasGoal}
				<svg class="goal-arc" viewBox="0 0 200 110" preserveAspectRatio="xMidYMax meet">
					<defs>
						<linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#e84c2b" />
							<stop offset="100%" stop-color="#ff8c42" />
						</linearGradient>
						<linearGradient id="arcGradientComplete" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#10b981" />
							<stop offset="100%" stop-color="#34d399" />
						</linearGradient>
					</defs>
					<path
						class="arc-bg"
						d="M 10 100 A 80 80 0 0 1 190 100"
						fill="none"
						stroke-width="6"
						stroke-linecap="round"
					/>
					<path
						class="arc-fill"
						d="M 10 100 A 80 80 0 0 1 190 100"
						fill="none"
						stroke={isComplete ? "url(#arcGradientComplete)" : "url(#arcGradient)"}
						stroke-width="6"
						stroke-linecap="round"
						stroke-dasharray="{filledLength} {arcLength}"
					/>
				</svg>
			{/if}

			<div class="balance-display">
				<span class="balance-label">{$t('HOME.BALANCE')}</span>
				<span class="balance-amount">{balanceFormatted}</span>

				{#if hasGoal}
					<div class="goal-indicator">
						<span class="goal-percent" class:complete={isComplete}>{progress.toFixed(0)}%</span>
						<span class="goal-text">
							{#if isComplete}
								🔥 FIRE
							{:else}
								→ {goalFormatted}
							{/if}
						</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.balance-card {
		position: relative;
		padding: 1.5rem;
		width: 92%;
		max-width: 400px;
		margin: 0 auto;
	}

	.balance-content {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.greeting h1 {
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}

	.subtitle {
		color: var(--tertiary);
		font-size: 0.9rem;
		font-weight: 400;
	}

	.balance-section {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.goal-arc {
		position: absolute;
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		max-width: 240px;
		height: auto;
		opacity: 0.9;
	}

	.arc-bg {
		stroke: rgba(255, 255, 255, 0.08);
	}

	.arc-fill {
		transition: stroke-dasharray 0.8s ease;
	}

	.balance-display {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		text-align: center;
		position: relative;
		z-index: 1;
		padding-bottom: 0.5rem;
	}

	.balance-label {
		color: var(--tertiary);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.balance-amount {
		color: var(--primary);
		font-size: 2.25rem;
		font-weight: 700;
		line-height: 1.1;
	}

	.goal-indicator {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
		padding: 0.375rem 0.875rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 20px;
	}

	.goal-percent {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--secondary);
	}

	.goal-percent.complete {
		color: var(--success);
	}

	.goal-text {
		font-size: 0.8rem;
		color: var(--tertiary);
	}

	@media (min-width: 768px) {
		.balance-card {
			padding: 2rem;
		}

		.balance-content {
			gap: 1.5rem;
		}

		.greeting h1 {
			font-size: 1.75rem;
		}

		.balance-amount {
			font-size: 2.5rem;
		}

		.goal-arc {
			max-width: 280px;
		}
	}

	@media (min-width: 1024px) {
		.balance-card {
			flex: 1;
			max-width: none;
			width: auto;
			min-width: 400px;
			padding: 2.5rem;
		}

		.greeting h1 {
			font-size: 2rem;
		}

		.balance-amount {
			font-size: 3rem;
		}

		.goal-arc {
			max-width: 320px;
			bottom: -10px;
		}

		.goal-indicator {
			padding: 0.5rem 1rem;
		}

		.goal-percent {
			font-size: 1rem;
		}

		.goal-text {
			font-size: 0.85rem;
		}
	}
</style>
