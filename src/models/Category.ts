import { Schema, model } from 'mongoose';
const schema = Schema;

const CategorySchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model('category', CategorySchema);
