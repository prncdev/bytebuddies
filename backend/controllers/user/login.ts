import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from 'bcryptjs'
import Users from "../../models/Users";
import Sessions from "../../models/Sessions";

const login: RequestHandler =  async function(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    // Check if email is valid and password is correct.
    if(user && (await bcrypt.compare(password, user.password))) {
      // This leads to us in a problematic situation, what if user wants to login more than one device?
      const isSessionExits = await Sessions.findOne({ user: user.id });

      // Remove this check after UI created.
      if(isSessionExits) {
        res.status(400);
        throw new Error('You\'r already logged in');
      }
      const accessToken = await Sessions.create({ user: user.id });
      res.status(200).json({ token: accessToken._id });
    } else {
      res.status(400);
      throw new Error('Invalid email or password');
    }
  } catch(error) {
    next(error);
  }
};

export default login;
// 662c3776f3ce2db4d58e7527