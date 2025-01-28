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

<div class="form-wrapper">
	<div class="form">
		<h1>Přihlášení do administrace</h1>
		<form onsubmit={login}>
			<label for="text">Přihlašovací jméno</label>
			<input type="text" bind:value={nickname} required />
			<label for="password">Heslo</label>
			<input type="password" bind:value={password} required />
			<div class="checkbox">
				<input type="checkbox" bind:checked={rememberMe} id="rememberMe" />
				<label for="rememberMe">Pamatuj si mě</label>
			</div>
			<button type="submit" class="btn-primary">Přihlásit</button>
		</form>
		<div class="links">
			<a href="/register">Registrace</a>
			<a href="/">Hlavní stránka</a>
		</div>
		<a href="/login/forgot-password" class="forgot-link">Zapomněli jste heslo?</a>
	</div>

	{#if notification}
		<div transition:fade class="notification">{notification}</div>
	{/if}

	{#if loginSuccess}
		<div transition:fade class="notification success">
			Přihlášení bylo úspěšné
		</div>
	{/if}
</div>

<style lang="stylus">
.form-wrapper
	display flex
	justify-content center
	align-items center
	min-height 100vh
	box-sizing border-box

.form
	background white
	padding 2rem
	border-radius 10px
	box-shadow 0 4px 20px rgba(0, 0, 0, 0.1)
	display flex
	flex-direction column
	gap 1rem
	transition transform 0.3s ease, box-shadow 0.3s ease

	h1
		margin-bottom 1rem
		font-size 1.8rem
		color #333
		text-align center

	form
		display flex
		flex-direction column
		gap 1rem

	label
		font-size 1rem
		color #666

	input
		padding 0.8rem
		font-size 1rem
		border 1px solid #ccc
		border-radius 5px
		transition border-color 0.3s ease, box-shadow 0.3s ease

		&:focus
			border-color #4facfe
			box-shadow 0 0 5px rgba(79, 172, 254, 0.5)
			outline none

	.checkbox
		display flex
		align-items center
		gap 0.5rem
		font-size 0.9rem

	.btn-primary
		background #4facfe
		color white
		padding 0.8rem
		border none
		border-radius 5px
		font-size 1rem
		font-weight bold
		cursor pointer
		transition background 0.3s ease, transform 0.2s ease

		&:hover
			background #00f2fe
			transform scale(1.05)

	.links
		display flex
		justify-content space-between
		align-items center
		gap 16px
		
		a
			text-decoration none
			color white
			display flex
			justify-content center
			align-items center
			background grey
			width 100%
			height 44px
			border-radius 5px
			transition ease .3s

			&:hover
				background white
				color black
				border 1px solid black

	.forgot-link
		color #4facfe
		text-align center
		font-size 0.9rem
		text-decoration none
		transition color 0.3s ease

		&:hover
			color #00f2fe

.notification
	padding 1rem
	background #ffe5e5
	color #ff4d4d
	border-radius 5px
	box-shadow 0 4px 10px rgba(255, 77, 77, 0.2)
	text-align center
	transition opacity 0.3s ease
	position absolute
	top 15px

.success
	background green
	color white
</style>
