import { Schema, model, models } from 'mongoose';

const noteSchema = new Schema({
  creator: {
    required: [true, 'id is required!'],
    type: Schema.Types.ObjectId,
    // type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  summary: {
    type: String,
    required: [true, 'Summary is required!'],
  },
  text: {
    type: String,
    required: [true, 'Text is required!'],
  },
  type: {
    type: String,
    required: [true, 'Type is required!'],
  },
  isFavorite: {
    type: Boolean,
    required: [true, 'isFavorite status is required!'],
  },
  time: {
    type: String,
    required: [true, 'time is required!']
  }
});

const Note = models.Note || model("Note", noteSchema)

export default Note;