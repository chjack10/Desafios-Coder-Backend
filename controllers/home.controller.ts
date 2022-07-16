import { Request, Response } from 'express';

export const renderHomeView = (_req: Request, res: Response) => {
  return res.render('home');
};
