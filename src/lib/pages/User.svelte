<script>
	import { actionSignOut } from "./../../firebase.js";
	import Button from "./../atoms/Button.svelte";
	import Card from "./../atoms/Card.svelte";
	import Tooltip from "./../atoms/Tooltip.svelte";

	const buttons = [
		{
			name: "SignOut",
			label: "Cerrar sesión",
			icon: "logout",
			style: "primary",
			onClick: actionSignOut,
		},
	];
</script>

<Card>
	{#each buttons as { label, icon, style, onClick, name } (name)}
		<div class="m-2 flex flex-col">
			<Tooltip {label}>
				<Button props={{ icon, style, onClick }} />
			</Tooltip>
		</div>
	{/each}
</Card>
