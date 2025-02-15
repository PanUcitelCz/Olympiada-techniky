import { serialize } from 'cookie';

export async function POST({ locals }) {

  const cookie = serialize('session', '', {
    httpOnly: true,
    maxAge: -1, // Okamžité vypršení cookie
    sameSite: 'strict',
    secure: true
  });

  return new Response('Logout successful', {
    status: 200,
    headers: {
      'Set-Cookie': cookie
    }
  });
}
