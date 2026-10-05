import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { validateUser, findUserByEmail } from './users';

const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

export async function loginRoute(req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;

  // prüft in der db
  if (!(await validateUser(email, password))) {
    return res.status(401).json({ ok: false, error: 'Invalid email or password' });
  }

  // prüft in der db
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ ok: false, error: 'Invalid email or password' });
  }

  const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: '1h',
    subject: user.email,
  });
  res.cookie('SESSIONID', jwtBearerToken, {
    httpOnly: true,
    secure: process.env['NODE_ENV'] === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 1000,
  });
  return res.status(200).json({ ok: true });
}
