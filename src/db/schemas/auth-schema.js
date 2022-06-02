import { Schema } from 'mongoose';

const AuthSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  ttl: {
    type: Number,
    required: true,
  },
});

export { AuthSchema };
