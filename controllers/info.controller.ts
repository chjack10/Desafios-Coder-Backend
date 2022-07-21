import { Request, Response } from 'express';

export const renderInfoView = (req: Request, res: Response) => {
  const { name, email } = req.user as any;

  return res.render('info', {
    title: process.argv,
    arguments: process.argv,
    system: process.platform,
    version: process.version,
    memory: process.memoryUsage.rss(),
    path: process.execPath,
    id: process.pid,
    folder: process.cwd(),
    name,
    email,
  });
};
