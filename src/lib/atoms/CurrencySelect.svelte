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

<select placeholder="currency" bind:value={$currency}>
    {#each currencies as curr}
        <option value={curr}>{getCurrencies(curr)}</option>
    {/each}
</select>

<style>
    select {
        color: var(--primary);
        background: var(--background__input);
        padding-left: 0.5rem;
        width: 12rem;
        height: 2rem;
        border: solid 0.25px var(--primary);
    }
</style>
