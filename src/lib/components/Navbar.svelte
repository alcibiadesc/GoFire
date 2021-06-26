<script>
	import { user } from "../../stores/user.js";
	import { signIn } from "./../../firebase-auth.js";
	import Avatar from "./../atoms/Avatar.svelte";

	$: img = $user.photoURL ? $user.photoURL : "icons/user.svg";
</script>

<div class="w-screen p-8">
	<div on:click={signIn} class="float-right">
		<Avatar {img} />
	</div>
</div>
