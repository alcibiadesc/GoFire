<script lang="ts">
	import { formatPercent } from '../../scripts/scripts.js';
	import ModalSavings from './ModalSavings.svelte';
	import Button from '../atoms/Button.svelte';
	import Tooltip from '../atoms/Tooltip.svelte';
	import { t } from '../../i18n/i18n';
	import { currency, formatNum } from '../../i18n/currency';

	interface Saving {
		amount: number;
		date?: string;
	}

	interface RowProp {
		id: string;
		title: string;
		number: number;
		hightlight: boolean;
		saving: Saving[];
	}

	export let edit = false;
	export let data: any;
	export let prop: RowProp = {
		id: '',
		title: 'Title',
		number: 0,
		hightlight: false,
		saving: [],
	};

	let { id, title, number, hightlight, saving } = prop;

	export let hideModal = true;
	const toggleModal = () => (hideModal = !hideModal);

	const actions = {
		remove: () => data.remove(id),
		changeName: () => data.change(id, 'title', title),
		changeNumber: () => data.change(id, 'number', number),
		changeHigh: () => data.change(id, 'hightlight', hightlight),
		toggleHigh: () => {
			hightlight = !hightlight;
			actions.changeHigh();
		},
	};

	const btns = [
		{
			icon: 'delete',
			style: 'tertiary' as const,
			onClick: actions.remove,
			label: $t('SETTINGS.TOOLTIPS.REMOVE'),
		},
		{
			icon: 'highlight',
			style: 'tertiary' as const,
			onClick: actions.toggleHigh,
			label: $t('SETTINGS.TOOLTIPS.HIGHLIGHT'),
		},
		{
			icon: 'saving',
			style: 'tertiary' as const,
			onClick: toggleModal,
			label: $t('SETTINGS.TOOLTIPS.SAVING'),
		},
	];

	$: getSaving = saving.reduce((acc, crt) => acc + crt.amount, 0);
	$: revenue = number - getSaving;
	$: percent = (number - getSaving) / getSaving;

	let numberFormatted = '';
	let revenueFormatted = '';

	$: currency.subscribe(() => {
		numberFormatted = formatNum(number);
		revenueFormatted = formatNum(revenue);
	});

	$: isPositive = revenue >= 0;
</script>

<ModalSavings
	{hideModal}
	{title}
	{id}
	save={data.saving}
	savings={prop.saving}
	removeSaving={data.removeSaving}
/>

<div class="row-container" class:highlighted={hightlight}>
	{#if edit}
		<div class="row-edit" draggable="true">
			<div class="row-inputs">
				<input
					name="title"
					on:change={actions.changeName}
					bind:value={title}
					class="input-title"
					type="text"
					placeholder="Category name"
				/>
				<div class="input-number-wrapper">
					<input
						name="number"
						on:change={actions.changeNumber}
						bind:value={number}
						class="input-number"
						type="number"
					/>
					{#if isFinite(percent)}
						<span class="row-percent" class:positive={isPositive} class:negative={!isPositive}>
							{formatPercent(percent)}
						</span>
					{/if}
				</div>
			</div>

			<div class="row-actions">
				{#each btns as btn}
					<Tooltip label={btn.label}>
						<Button prop={btn} />
					</Tooltip>
				{/each}
			</div>
		</div>
	{:else}
		<div class="row-display">
			<div class="row-info">
				<span class="row-title">{title}</span>
				{#if saving.length > 0}
					<span class="row-revenue">
						{$t('HOME.PROFITABILITY')} {revenueFormatted}
					</span>
				{/if}
			</div>

			<div class="row-values">
				<span class="row-amount">{numberFormatted}</span>
				{#if isFinite(percent)}
					<span class="row-percent" class:positive={isPositive} class:negative={!isPositive}>
						{formatPercent(percent)}
					</span>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.row-container {
		position: relative;
		width: 100%;
	}

	.highlighted::before {
		content: '';
		position: absolute;
		left: -12px;
		top: 0;
		bottom: 0;
		width: 3px;
		background: var(--secondary);
		border-radius: 2px;
	}

	/* Display Mode */
	.row-display {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.row-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 0;
	}

	.row-title {
		color: var(--tertiary);
		font-size: 0.875rem;
		font-weight: 500;
	}

	.row-revenue {
		color: var(--tertiary);
		font-size: 0.75rem;
		opacity: 0.8;
	}

	.row-values {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-shrink: 0;
	}

	.row-amount {
		color: var(--primary);
		font-size: 1.25rem;
		font-weight: 600;
	}

	.row-percent {
		font-size: 0.875rem;
		font-weight: 600;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.1);
	}

	.positive {
		color: #10b981;
	}

	.negative {
		color: #ef4444;
	}

	/* Edit Mode */
	.row-edit {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.row-inputs {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-title {
		border: none;
		background: none;
		color: var(--tertiary);
		font-size: 0.875rem;
		padding: 0.25rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		width: 100%;
	}

	.input-title:focus {
		border-bottom-color: var(--secondary);
	}

	.input-number-wrapper {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.input-number {
		background: none;
		border: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--primary);
		font-size: 1.25rem;
		font-weight: 600;
		width: 120px;
		padding: 0.25rem 0;
		-moz-appearance: textfield;
	}

	.input-number::-webkit-outer-spin-button,
	.input-number::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.input-number:focus {
		border-bottom-color: var(--secondary);
	}

	.row-actions {
		display: flex;
		gap: 0.25rem;
		justify-content: flex-end;
	}

	/* Desktop */
	@media (min-width: 1024px) {
		.row-edit {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.row-inputs {
			flex-direction: row;
			align-items: center;
			gap: 1.5rem;
			flex: 1;
		}

		.input-title {
			width: 200px;
		}

		.row-amount {
			font-size: 1.5rem;
		}
	}
</style>
