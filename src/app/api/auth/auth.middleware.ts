// cookie prüfen
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');

export const checkIfAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies['SESSIONID'];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return; // abbrechen, falls kein token vorhanden ist
  }
  // falls token vorhanden ist, versuchen, den token zu verifizieren
  try {
    req.user = jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256'] });
    next(); // heisst: nächste funktion in der Kette
  } catch {
    res.sendStatus(401);
  }
};
