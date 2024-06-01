import { NextFunction, Request, Response } from 'express';
import Users from '../../models/Users';

const deleteUser = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("Can't delete the user, invalid ID");
    }

    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: deletedUser?._id, name: deletedUser?.name });
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
