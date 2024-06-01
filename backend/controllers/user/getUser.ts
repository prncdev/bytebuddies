import { NextFunction, Request, Response } from "express";
import Users from "../../models/Users";

const getUser = async function(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await Users.findById(req.params.id);
    
    if(!user) {
      res.status(404);
      throw new Error('No user found');
    }
    
    res.status(200).json(user);
  } catch(error) {
    next(error);
  }
}

export default getUser;