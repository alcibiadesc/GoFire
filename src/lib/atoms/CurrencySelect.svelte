<script>
    import currencyDict from "./../../i18n/currencyDict";
    import { currency } from "./../../i18n/currency";

    const currencies = Object.keys(currencyDict).sort();

    const getCurrencies = (curr = "USD") => {
        let value = currencyDict[curr];
        let symbol = value.symbol;
        let name = value.name;

        return `${curr} | ${name} - ${symbol}`;
    };
</script>

<select
    aria-label="Select currency"
    bind:value={$currency}
>
    {#each currencies as curr}
        <option value={curr}>{getCurrencies(curr)}</option>
    {/each}
</select>

<style>
    select {
        color: var(--primary);
        background: var(--background__input);
        padding: 0.5rem 0.75rem;
        width: 100%;
        max-width: 12rem;
        height: 2.5rem;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    select:hover {
        border-color: rgba(255, 255, 255, 0.2);
    }

    select:focus {
        outline: none;
        border-color: var(--secondary);
        box-shadow: 0 0 0 3px rgba(232, 76, 43, 0.15);
    }
</style>
