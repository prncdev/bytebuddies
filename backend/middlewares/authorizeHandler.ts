import { RequestHandler } from 'express';
import Users from '../models/Users';

export const authorizeHandler: RequestHandler = async function (req: any, res, next) {
  let token: string | null = null;
  try {
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const userSession = await Users.findOne({ session: token }).select(['-password']);

      if (userSession?.expiresOn && userSession.expiresOn < new Date()) {
        console.log('session has expired');
        
        userSession.session = undefined;
        userSession.expiresOn = undefined;
        await userSession.save();

        res.status(403).json({ message: 'Session has expired' });
        return; // Ensure no further processing occurs
      }

      if (!userSession) {
        res.status(401).json({ message: 'Unauthorized, no session' });
        return; // Ensure no further processing occurs
      }

      req.user = userSession;
      next(); // Move to the next middleware/controller
    } else if (!token) {
      res.status(401).json({ message: 'Unauthorized, no session ID' });
    }
  } catch (error) {
    next(error);
  }

};
