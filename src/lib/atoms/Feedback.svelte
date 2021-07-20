<script>
    import { t } from "./../../i18n/i18n";
    (function () {
        var qs,
            js,
            q,
            s,
            d = document,
            gi = d.getElementById,
            ce = d.createElement,
            gt = d.getElementsByTagName,
            id = "typef_orm_share",
            b = "https://embed.typeform.com/";
        if (!gi.call(d, id)) {
            js = ce.call(d, "script");
            js.id = id;
            js.src = b + "embed.js";
            q = gt.call(d, "script")[0];
            q.parentNode.insertBefore(js, q);
        }
    })();
</script>

<div style="text-align:center;">
    <a
        class="typeform-share button"
        href="https://form.typeform.com/to/x2B9zltX?typeform-medium=embed-snippet"
        data-mode="popup"
        style="display:inline-block;text-decoration:none;background-color:#E84C2B;color:white;cursor:pointer;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:50px;text-align:center;margin:0;height:50px;padding:0px 33px;border-radius:25px;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:bold;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;"
        data-size="100"
        target="_blank"
    >
        {$t("PROFILE.OPTIONS.CONTACT")}
    </a>
</div>

<style>
    a {
        background-color: var(--secondary);
    }
</style>
