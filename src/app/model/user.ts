import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const { Schema, model } = mongoose;

interface IUser {
  username: string
  name: string
  password: string
  isAdm: boolean
  createdAt: string
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name:  {
    type: String,
    required: true
  },
  password:  {
    type: String,
    required: true,
    select: false
  },
  isAdm:  {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

UserSchema.pre<IUser>('save', async function (next) {
  if(this.password){
    const hash = await bcrypt.hash(this.password, 12)
    this.password = hash
    next();
  }
})

export const UserModel = model<IUser>('User', UserSchema)
