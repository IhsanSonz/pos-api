import { Schema, model } from 'mongoose';
const schema = Schema;

const TagSchema = new schema({
  name: {
    type: String,
    required: true,
  },
});

export default model('tag', TagSchema);

export interface TagTypes {
  name: string;
}
