<script>
	import { actionSignOut, signIn } from "./../../firebase-auth.js";
	import Button from "./../atoms/Button.svelte";
	import Card from "./../atoms/Card.svelte";
	import Tooltip from "./../atoms/Tooltip.svelte";
	import { user } from "./../../stores/user.js";

	const btnsLogin = [
		{
			name: "SignOut",
			label: "Cerrar sesión",
			icon: "logout",
			style: "primary",
			onClick: actionSignOut,
		},
	];

	const btnSignin = {
		icon: "login",
		style: "primary",
		onClick: signIn,
	};
</script>

<Card>
	{#if $user}
		<img class="mx-auto rounded-lg" src={$user.photoURL} alt="user" />
		<div class="my-8">
			<h2>{$user.displayName}</h2>
			<h2>{$user.email}</h2>
			<h3>uid: {$user.uid}</h3>
		</div>
		{#each btnsLogin as { label, icon, style, onClick, name } (name)}
			<div class="m-2 flex flex-col">
				<Tooltip {label}>
					<Button props={{ icon, style, onClick }} />
				</Tooltip>
			</div>
		{/each}
	{:else}
		<h2 class="text-center">Haz click para iniciar sesión</h2>
		<div class="m-2 flex flex-col">
			<Tooltip label="Iniciar sesión">
				<Button props={btnSignin} />
			</Tooltip>
		</div>
	{/if}
</Card>
