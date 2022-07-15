import { Request, Response } from 'express';
import { generateToken } from '../jwt/jwt';
import User from '../models/schema/user';

export const renderLoginView = (req: Request, res: Response) => {
  return res.render('login');
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({
      message: 'User not found',
    });
  }

  const loggedUser = new User(user);

  const token = generateToken(loggedUser);

  return res.json({ token });
};
