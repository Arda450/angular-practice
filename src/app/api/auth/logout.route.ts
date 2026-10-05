import { Request, Response } from 'express';

export function logoutRoute(_req: Request, res: Response) {
  res.clearCookie('SESSIONID', { path: '/' });
  res.sendStatus(204);
}
