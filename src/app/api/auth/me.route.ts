import { Request, Response } from 'express';

export function meRoute(req: Request, res: Response) {
  res.status(200).json({ user: req.user });
}
