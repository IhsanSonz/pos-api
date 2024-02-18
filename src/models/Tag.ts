import { Schema, model } from 'mongoose';
const schema = Schema;

const TagSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model('tag', TagSchema);

export const TmpTag = model('tmp_tag', TagSchema);
