import { NextFunction, Request, RequestHandler, Response } from "express";
import Users from "../../models/Users";

const logout: RequestHandler =  async function(req: Request, res: Response, next: NextFunction) {
  let token: string | null = null;

  try {
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const user = await Users.findOne({ session: token });
      if(user) {
        // If we set a field as `undefined` if will automatically deletes that field from the document.
        user.session = undefined;
        user.expiresOn = undefined;
        await user.save();
        res.status(200).json({ token});
      } else {
        res.status(400);
        throw new Error('Not logged in');
      }
      
    } else if (!token) {
      res.status(401);
      throw new Error('unauthorized, no token');
    }
  } catch (error) {
    next(error);
  }
};

export default logout;