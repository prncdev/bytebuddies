
import { Document, model, Schema } from "mongoose";
interface IDocs extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  content: string;
}

const documentSchema = new Schema<IDocs>({
  user:     { type: Schema.Types.ObjectId, required: true, ref: 'Users'},
  title:    { type: String, required: true },
  content:  { type: String, required: true },
}, {
  timestamps: true,
});

const Documents = model<IDocs>('Documents', documentSchema);

export default Documents;