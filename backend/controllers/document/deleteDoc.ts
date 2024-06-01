import { RequestHandler } from 'express';
import Documents from '../../models/Documents';

const deleteDoc: RequestHandler = async function (req: any, res, next) {
  try {
    const content = await Documents.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    // Check whether the document is exists with provided Doc ID.
    if (!content) {
      res.status(404);
      throw new Error("Can't delete no content found");
    }

    // Check if the current loggedin user is owner/author of the doucment, before update.
    if (content.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error('unauthorized');
    }

    const deletedDoc = await Documents.findByIdAndDelete(req.params.id);

    res.status(200).json({
      id: deletedDoc?.id,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default deleteDoc;
