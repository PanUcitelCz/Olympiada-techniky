<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>{$page.error?.message}</h1>
<p>Nejste přihlášený, sem může jen administrátor</p>

<a href="/">Zpět na hlavní stránku</a>
