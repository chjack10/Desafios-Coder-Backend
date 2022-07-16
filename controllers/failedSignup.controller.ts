import { Request, Response } from 'express';

export const renderfailedSignupView = (_req: Request, res: Response) => {
  return res.render('failedSignup');
};
