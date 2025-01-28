<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	// Reaktivní proměnné
	let registrationSuccess = $state(false);
	let notification = $state('');
	let email = $state('');
	let nickname = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	function validatePassword(password: string) {
		const errors = [];
		if (!/[A-Z]/.test(password)) {
			errors.push('Heslo musí obsahovat alespoň jedno velké písmeno.');
		}
		if (!/[0-9]/.test(password)) {
			errors.push('Heslo musí obsahovat alespoň jednu číslici.');
		}
		if (password.length < 8) {
			errors.push('Heslo musí mít alespoň 8 znaků.');
		}
		return errors;
	}

	async function register(event: Event) {
		event.preventDefault();
		notification = '';

		if (password !== confirmPassword) {
			notification = 'Hesla se neshodují.';
			return;
		}

		const passwordErrors = validatePassword(password);
		if (passwordErrors.length > 0) {
			notification = passwordErrors.join(' ');
			return;
		}

		const formData = new FormData();
		formData.append('email', email);
		formData.append('nickname', nickname);
		formData.append('password', password);

		const response = await fetch('/register', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();
			if (result.success) {
				registrationSuccess = true;
				setTimeout(() => {
					goto('/login');
				}, 1000);
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
		<h1>Registrace</h1>
		<form on:submit|preventDefault={register}>
			<label for="email">E-mail</label>
			<input id="email" type="email" bind:value={email} required />
			
			<label for="nickname">Uživatelské jméno</label>
			<input id="nickname" type="text" bind:value={nickname} required />
			
			<label for="password">Heslo</label>
			<input id="password" type="password" bind:value={password} required />
			
			<label for="confirmPassword">Potvrdit heslo</label>
			<input id="confirmPassword" type="password" bind:value={confirmPassword} required />
			
			<button type="submit" class="btn-primary">Vytvořit účet</button>
		</form>
		<div class="links">
			<a href="/">Domů</a>
			<a href="/login">Přihlásit se</a>
		</div>
	</div>

	{#if notification}
		<div transition:fade class="notification">{notification}</div>
	{/if}

	{#if registrationSuccess}
		<div transition:fade class="notification success">
			Registrace úspěšná! Přesměrováváme na přihlášení...
		</div>
	{/if}
</div>

<style lang="stylus">
.form-wrapper
	display flex
	justify-content center
	align-items center
	min-height 100vh

.form
	background white
	padding 2rem
	border-radius 10px
	box-shadow 0 4px 20px rgba(0, 0, 0, 0.1)
	display flex
	flex-direction column
	gap 1rem
	max-width 400px
	width 100%

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
		font-weight bold

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

	.links
		display flex
		justify-content space-between
		gap 1rem

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

.notification
	padding 1rem
	background #ffe5e5
	color #ff4d4d
	border-radius 5px
	box-shadow 0 4px 10px rgba(255, 77, 77, 0.2)
	text-align center
	transition opacity 0.3s ease


</style>
