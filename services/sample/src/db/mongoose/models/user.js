import mongoose, { Schema } from 'mongoose';
import log from '../../../config/logger';

const UserSchema = new Schema({
    userName: {
      type: String,
      unique: true,
      required: true,
    },    
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    id: {
      index: true,
      type: String,
      //default: () => {
        
      //},
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
  },
  {
      timestamps: true
  });

const User = mongoose.model('User', UserSchema);
export default User;
