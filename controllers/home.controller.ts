import { Request, Response } from 'express';

export const renderHomeView = (req: Request, res: Response) => {
  return res.render('home');
};
