import jtw from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const generateToken = (payload: any) => {
  return jtw.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }

  jtw.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    req.user = decoded;
    next();
  });
};
