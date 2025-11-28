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
</script>

<div class="balance-card card__background">
	<div class="balance-content">
		<div class="greeting">
			<h1>{$t('HOME.HI')}, {name}</h1>
			<p class="subtitle">{$t('HOME.SUBTITLE')}</p>
		</div>

		<div class="balance-display">
			<span class="balance-label">{$t('HOME.BALANCE')}</span>
			<span class="balance-amount">{balanceFormatted}</span>
		</div>

		{#if hasGoal}
			<div class="goal-section">
				<div class="goal-text-row">
					<span class="goal-progress-text">
						{#if isComplete}
							Goal reached
						{:else}
							<strong>{progress.toFixed(0)}%</strong> of {goalFormatted} goal
						{/if}
					</span>
				</div>
				<div class="goal-bar">
					<div
						class="goal-bar-fill"
						class:complete={isComplete}
						style="width: {progress}%"
					></div>
				</div>
			</div>
		{/if}
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
		gap: 1.5rem;
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

	.balance-display {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
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
		font-weight: 600;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}

	/* Goal - Airbnb style: minimal, typography-focused */
	.goal-section {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.goal-text-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.goal-progress-text {
		font-size: 0.875rem;
		color: var(--tertiary);
		font-weight: 400;
	}

	.goal-progress-text strong {
		color: var(--secondary);
		font-weight: 600;
	}

	.goal-bar {
		height: 4px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
		overflow: hidden;
	}

	.goal-bar-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--secondary), #ff8a5c);
		border-radius: 2px;
		transition: width 0.6s ease;
	}

	.goal-bar-fill.complete {
		background: linear-gradient(90deg, var(--success), #34d399);
	}

	@media (min-width: 768px) {
		.balance-card {
			padding: 2rem;
		}

		.greeting h1 {
			font-size: 1.75rem;
		}

		.balance-amount {
			font-size: 2.5rem;
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

		.goal-progress-text {
			font-size: 0.9375rem;
		}

		.goal-bar {
			height: 5px;
		}
	}
</style>
