<script>
    import translations from "./../../i18n/translations";
    $: languages = Object.keys(translations);
</script>

<input list="languagues" placeholder="Languague" />
<datalist id="languagues">
    {#each languages as lang}
        <option>{lang}</option>
    {/each}
</datalist>

<style>
    input {
        color: var(--primary);
        background: var(--background__input);
        padding-left: 0.5rem;
        width: 7rem;
    }
</style>
