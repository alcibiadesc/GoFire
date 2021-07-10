<script>
  import { user } from "../../stores/user.js";
  import { signIn } from "./../../firebase/firebase-auth.js";
  import Avatar from "./../atoms/Avatar.svelte";
  import Switch from "./../atoms/Switch.svelte";

  $: img = $user.photoURL ? $user.photoURL : "icons/user.svg";
</script>

<div class="w-screen p-8">
  <div class="float-left ">
    <Switch />
  </div>
  <div class="float-right">
    <Avatar onClick={signIn} {img} />
  </div>
</div>
