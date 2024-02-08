import { Schema, model } from 'mongoose';
const schema = Schema;

const ProductSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      required: false,
    },
  ],
});

export default model('product', ProductSchema);
