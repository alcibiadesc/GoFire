<script>
    import translations from "./../../i18n/translations";
    import { locale } from "./../../i18n/i18n.js";

    $: languages = Object.keys(translations).sort();

    const getTranslations = (lang = "en") => {
        let value = translations[lang].VALUE;
        return value ? value : lang;
    };
</script>

<select placeholder="language" bind:value={$locale}>
    {#each languages as lang}
        <option value={lang}> {getTranslations(lang)}</option>
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
