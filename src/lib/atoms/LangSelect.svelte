<script>
    import translations from "./../../i18n/translations";
    import { dict, locale, t } from "./../../i18n/i18n.js";

    $: languages = Object.keys(translations);
    $: dict.set(translations);
</script>

<select placeholder="Languague" bind:value={$locale}>
    {#each languages as lang}
        <option value={lang}>{lang}</option>
    {/each}
</select>

<style>
    select {
        color: var(--primary);
        background: var(--background__input);
        padding-left: 0.5rem;
        width: 7rem;
        height: 2rem;
        border: solid 0.25px var(--primary);
    }
</style>
