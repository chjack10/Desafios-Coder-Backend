import { Request, Response } from 'express';
import { generateToken } from '../jwt/jwt';
import User from '../models/schema/user';

export const renderSignUpView = (req: Request, res: Response) => {
  return res.render('signup');
};

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(409).json({
      message: 'User already exists',
    });
  }

  const newUser: any = new User({});
  newUser.name = name;
  newUser.email = email;
  newUser.password = await newUser.encryptPassword(password);

  await newUser.save();

  const token = generateToken({
    newUser,
  });

  return res.json({
    token,
  });
};
