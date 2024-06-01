import { NextFunction, Request, Response } from 'express';
import Users from '../../models/Users';

const updateUser = async function ( req: Request, res: Response, next: NextFunction) {
  try {
    const user = await Users.findById(req.params.id);

    // If unable to find the document, it'll return `null` value.
    if (!user) {
      res.status(404);
      throw new Error('User not found with id: '+req.params.id);
    }

    // We use the mongoose method called `findByIdAndUpdate`, which takes 3 arguments: `docID`, `fields with values` and the `option object` where we can define or tell the mongoose to create a new field in the document if it's not already there.
    const updateUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(201).json(updateUser);
  } catch (error) {
    next(error);
  }
};

export default updateUser;
