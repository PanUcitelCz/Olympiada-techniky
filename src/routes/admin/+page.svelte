<script lang="ts">
	import { goto } from '$app/navigation';

	const { data } = $props();
	const user = data.user;

	async function logout() {
		const response = await fetch('/logout', { method: 'POST' });
		if (response.ok) {
			setTimeout(() => {
				goto('/login');
			}, 1000);
		} else {
			alert('Logout failed');
		}
	}
</script>

<h1>Admin</h1>

<h1>Vítejte, {user.nickname}</h1>
<p>Email: {user.email}</p>
<button onclick={logout} class="logout">Odhlásit</button>



