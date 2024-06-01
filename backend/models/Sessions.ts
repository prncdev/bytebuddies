
import { Document, model, Schema } from "mongoose";
interface ISession extends Document {
  user: Schema.Types.ObjectId;
}

const sessionSchema = new Schema<ISession>({
  user:  { type: Schema.Types.ObjectId, required: true, ref: 'Users'},
}, {
  timestamps: true,
});

const Sessions = model<ISession>('Sessions', sessionSchema);

export default Sessions;