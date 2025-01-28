import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function handle({ event, resolve }) {
  const session = event.cookies.get('session'); // Načtení cookie

  if (session) {
    // Načtení uživatele podle ID z cookie
    const user = await db.select({
      id: usersTable.id,
      email: usersTable.email,
      nickname: usersTable.nickname,
    }).from(usersTable).where(eq(usersTable.id, parseInt(session))).get();

    if (user) {
      event.locals.user = user; // Nastavení uživatele do locals
    }
  }

  return resolve(event);
}
