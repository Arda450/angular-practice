import { Request, Response } from 'express';
import { findUserByEmail, createUser } from './users';

export async function registerRoute(req: Request, res: Response) {
  const { givenName, familyName, email, password } = req.body ?? {};

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return res.status(400).json({ error: 'Ungültige E-Mail.' });
  }

  if (!givenName || !familyName || !email || !password) {
    return res.status(400).json({ error: 'Alle Felder müssen ausgefüllt werden.' });
  }

  function isInvalidName(name: unknown): boolean {
    return typeof name !== 'string' || name.length < 1 || name.length > 30;
  }

  if (isInvalidName(givenName) || isInvalidName(familyName)) {
    return res.status(400).json({
      error: 'Vor- und Nachname müssen zwischen 1 und 30 Zeichen lang sein.',
    });
  }

  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'Passwort muss mindestens 8 Zeichen lang sein.' });
  }

  try {
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await createUser(givenName, familyName, email, password);
    return res.status(201).json({ ok: true, user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Registrierung fehlgeschlagen.' });
  }
}
