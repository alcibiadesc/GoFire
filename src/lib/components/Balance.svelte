<script lang="ts">
	import { formatNum, currency } from '../../i18n/currency';
	import Goal from '../atoms/Goal.svelte';
	import { user } from '../../stores/user.js';
	import { goal } from '../../stores/goal.js';
	import { t } from '../../i18n/i18n';

	export let balance: number = 0;
	$: name = $user?.displayName ? $user.displayName.split(' ')[0] : 'crack';

	let balanceFormatted = '';

	$: currency.subscribe(() => {
		balanceFormatted = formatNum(balance);
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
	</div>

	<Goal {balance} goal={$goal} />
</div>

<style>
	.balance-card {
		position: relative;
		padding: 2rem;
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
		font-size: 1.75rem;
		margin-bottom: 0.25rem;
	}

	.subtitle {
		color: var(--tertiary);
		font-size: 0.95rem;
		font-weight: 400;
	}

	.balance-display {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.balance-label {
		color: var(--tertiary);
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.balance-amount {
		color: var(--primary);
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.1;
	}

	/* Desktop */
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
	}
</style>
