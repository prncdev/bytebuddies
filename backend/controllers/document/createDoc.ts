import { RequestHandler } from 'express';
import Documents from '../../models/Documents';

const setDoc: RequestHandler = async function(req: any, res, next) {
  try {
    const user = req.user.id;
    const { content } = req.body;
    const contentCreated = await Documents.create({ user, content });
    
    res.status(201).json(contentCreated);
  } catch(error) {
    next(error);
  }
}

export default setDoc;