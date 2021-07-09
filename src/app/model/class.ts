import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export interface IClass {
  title: string
  module: {
    _id: string
  }
  link: string
  classDate: string
  createdAt: string
}

const ClassSchema = new Schema<IClass>({
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  module:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: false,
  },
  classDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})


export const ClassModel = model<IClass>('Class', ClassSchema)
