import { RequestHandler } from "express";
import Documents from "../../models/Documents";

const updateDoc: RequestHandler = async function(req: any, res, next) {
  try {
    const content = await Documents.findOneAndUpdate({ _id: req.params.id, user: req.user.id });

    // Check whether the document is exists with provided Doc ID.
    if(!content) {
      res.status(404);
      throw new Error('No content found to update');
    }

    // Check if the current loggedin user is owner/author of the doucment, before update.
    // if(content.user.toString() !== req.user.id) {
    //   res.status(403);
    //   throw new Error('Not authorized to perform this action');
    // }

    const updatedDoc = await Documents.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json({ content: updatedDoc});
    
  } catch(error) {
    next(error);
  }
}

export default updateDoc