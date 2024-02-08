import { Schema, model } from 'mongoose';
const schema = Schema;

const CategorySchema = new schema({
  name: {
    type: String,
    required: true,
  },
});

export default model('category', CategorySchema);
