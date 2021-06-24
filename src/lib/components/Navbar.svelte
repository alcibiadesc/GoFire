<script>
	import Button from "../atoms/Button.svelte";
	import { user } from "../../stores/user.js";
	import { signIn, getToken } from "./../../firebase-auth.js";
	import Avatar from "./../atoms/Avatar.svelte";
	const buttom = {
		icon: "menu",
		style: "primary",
	};

	getToken(user);
</script>

<div class="w-screen p-8">
	<div on:click={signIn} class="float-right">
		<Avatar img={$user.img} />
	</div>

	<!--
	<div class="float-left">
		<Button props={buttom} />
	</div>
	-->
</div>
