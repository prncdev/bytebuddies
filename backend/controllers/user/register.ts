import bcrypt from 'bcryptjs';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import Users, { IUsers } from '../../models/Users';

const register: RequestHandler = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { name, age, gender, email, password } = req.body;

    // Checking fields aren't empty.
    if (!name || !email || !password || !age || !gender) {
      res.status(400);
      throw new Error('Please provide all the neccessary fields');
    }

    // Check whether user is already exists.
    const userExist = await Users.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error('Email already in use');
    }

    // Hash the password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate new Session ID.
    const UUID = crypto.randomUUID();
    const session = (await bcrypt.genSalt(10)) + '--' + UUID;
    // Set the expiry date for the token.
    const expiresOn = new Date();
    expiresOn.setHours(expiresOn.getHours() + 24);

    // create a user
    const user: IUsers = await Users.create({
      name,
      age,
      gender,
      email,
      password: hashedPassword,
      session,
      expiresOn,
    });

    // Check if user created successfully.
    if (user) {
      res.status(201).json({
        name: user.name,
        email: user.email,
        token: user.session
      });
    } else {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

export default register;
