import { Schema, model } from 'mongoose';
const schema = Schema;

const UserSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model('user', UserSchema);
