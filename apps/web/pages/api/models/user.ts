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
    googleId: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: function (this: any) {
        return !this.googleId ? [true, 'Password is required'] : false;
      } as any, // TO DO: avoid any
      select: false,
    },
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
    profileCircleBackgroundColor: {
      type: String,
      required: false,
    },
    profileCircleTextColor: {
      type: String,
      required: false,
    },
    profileCircleText: {
      type: String,
      required: false,
    },
    userType: {
      type: String,
      enum: ['admin', 'default'],
      default: 'default',
      required: true,
    },
  },
  { versionKey: false }
);

const User = models.User || model('User', UserSchema);

export default User;
