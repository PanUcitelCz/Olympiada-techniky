import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw error(401, 'Uživatel není přihlášený'); // Vyhodí chybu a zobrazí +error.svelte
  }

  return {
    user: locals.user, // Předejte uživatele do frontendu
  };
};
