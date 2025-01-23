<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	// Reaktivní proměnné
	let loginSuccess = $state(false);
	let notification = $state('');
	let nickname = $state('');
	let password = $state('');
	let rememberMe = $state(false); // Přidání stavu pro "Zapamatovat si mě"

	async function login(event: Event) {
		event.preventDefault();
		notification = '';

		const formData = new FormData();
		formData.append('nickname', nickname);
		formData.append('password', password);
		formData.append('rememberMe', rememberMe ? 'true' : 'false'); // Přidáme hodnotu pro "Zapamatovat si mě"

		const response = await fetch('/login', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();
			if (result.success) {
				loginSuccess = true;
				setTimeout(() => {
					goto('/admin');
				}, 1000);
			} else if (result.message === 'Please verify your email before logging in.') {
				notification = 'The email has not been verified yet. Please verify it before logging in.';
			} else {
				notification = result.message;
			}
		} else {
			const errorResult = await response.json();
			notification = errorResult.message;
		}
	}
</script>

<div class="Main">
	<div class="form">
		<h1>Přihlášení do administrace</h1>
		<form onsubmit={login}>
			<input type="text" bind:value={nickname} placeholder="Přihlašovací jméno" required />
			<input type="password" bind:value={password} placeholder="Heslo" required />
            <div class="checkbox">
                <input type="checkbox" bind:checked={rememberMe} />
                <span>Pamatuj si mě</span>
            </div>
			<button type="submit" color="green">Přihlásit</button>
		</form>
		<a href="/login/forgot-password">Zapoměnli jste heslo?</a>
		<div class="form-buttons">
			<a href="/" >Hlavní stránka</a>
		</div>

		{#if notification}
			<div transition:fade class="notification">{notification}</div>
		{/if}

		{#if loginSuccess}
			<div transition:fade class="notification" style="color: green">
				Přihlášení bylo úspěšné
			</div>
		{/if}
	</div>
</div>

<style lang="stylus">
  //@import '../../lib/css/form.styl'
    a
        text-decoration none
        color #334257
        transition ease .3s
        padding 10px
        border-radius 10px

        &:hover
            color black
            background #F5F5F5

    .checkbox
        display flex
        align-items center
        margin-bottom 20px
        width 100%
        gap 8px
        margin 0

        input[type="checkbox"]
            width 15px
            height 15px
            cursor pointer

</style>
