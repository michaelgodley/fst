import mongoose, { Schema } from 'mongoose';
import log from '../../../config/logger';

const RefreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  userEmail: {
    type: 'String',
    ref: 'User',
    required: true,
  },
  expires: {
    type: Date
  },
});

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
export default RefreshToken;

