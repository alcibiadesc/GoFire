<script>
    import translations from "./../../i18n/translations";
    import { locale } from "./../../i18n/i18n.js";

    const languages = Object.keys(translations).sort();

    const getTranslations = (lang = "en") => {
        let value = translations[lang].VALUE;
        return value ? value : lang;
    };
</script>

<select
    aria-label="Select language"
    bind:value={$locale}
>
    {#each languages as lang}
        <option value={lang}>{getTranslations(lang)}</option>
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
