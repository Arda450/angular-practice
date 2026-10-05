import { pool } from '../db';
import bcrypt from 'bcryptjs';

export type UserRow = {
  id: number;
  email: string;
  password_hash: string;
  given_name: string | null;
  family_name: string | null;
  created_at: Date;
};

// pool.query gibt ein objekt zurück
export async function findUserByEmail(email: string): Promise<UserRow | null> {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0] ?? null;
}

// user finden und passwort vergleichen
// wenn user nicht gefunden wird, return false
// wenn user gefunden wird, passwort mit bcrypt vergleichen und return true oder false
export async function validateUser(email: string, password: string): Promise<boolean> {
  const user = await findUserByEmail(email);
  if (!user) return false;
  return bcrypt.compare(password, user.password_hash);
}

export async function createUser(
  givenName: string,
  familyName: string,
  email: string,
  password: string,
) {
  const passwordHash = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    `INSERT INTO users (email, password_hash, given_name, family_name)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, given_name, family_name, created_at`,
    [email, passwordHash, givenName, familyName],
  );
  return rows[0];
}
