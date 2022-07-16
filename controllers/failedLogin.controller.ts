import { Request, Response } from 'express';

export const renderfailedLoginView = (_req: Request, res: Response) => {
  return res.render('failedLogin');
};
