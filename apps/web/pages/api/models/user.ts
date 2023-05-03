import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
    },
    fullname: {
      type: String,
      required: [true, 'Full name is required'],
      minLength: [4, 'Full name should be at least 4 charachters'],
      maxLength: [30, 'Full name should be less than 30 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  },
  { versionKey: false }
);

const User = models.User || model('User', UserSchema);

export default User;
