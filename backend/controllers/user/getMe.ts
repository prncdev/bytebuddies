import { NextFunction, Request, RequestHandler, Response } from 'express';

const getMe: RequestHandler = async function(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { _id, name, email }: any = req.user;
    res.status(200).json({id: _id, name, email});
  } catch(error) {
    next(error);
  }
};

export default getMe;