import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from 'bcryptjs'
import Users from "../../models/Users";

const login: RequestHandler =  async function(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    // Check if email is valid and password is correct.
    if(user && (await bcrypt.compare(password, user.password))) {
      
      // Don't create a new Session ID if a user has already one, just return that session ID.
      if(user.session) {
        res.status(200).json({ token: user.session, name: user.name, email: user.email });
      } else {
        
        // Generate new Session ID.
        const UUID = crypto.randomUUID();
        const longSessionID = await bcrypt.genSalt(10) +'--'+ UUID;
        const expiresOn = new Date();
        expiresOn.setHours(expiresOn.getHours() + 24);

        // Set the session for the user.
        const { session }: any = await Users.findByIdAndUpdate(user.id, { session: longSessionID, expiresOn }, {new: true});
        res.status(201).json({ name: user.name, email: user.email, token: session });
    }
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