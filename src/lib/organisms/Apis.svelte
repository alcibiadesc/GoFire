<script>
	import Input from "./../atoms/Input.svelte";
	import { apis } from "./../../stores/apis.js";

	const inputs = [
		{
			label: "kraken",
			placeholder: "add your API",
			type: "text",
			icon: false,
			api: $apis.kraken,
		},
	];

	let apiObj = {};
	$: inputs.map((value) => {
		value.api ? (apiObj = { ...apiObj, [value.label]: value.api }) : "";
		apis.set(apiObj);
	});

	apis.subscribe((v) => console.log(v));
</script>

<h1>Conecta tus plataformas</h1>
{#each inputs as { label, placeholder, type, icon, api }}
	<Input bind:value={api} {label} {placeholder} {type} {icon} />
{/each}
