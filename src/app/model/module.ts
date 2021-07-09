import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export interface IModule {
  _id: string
  title: string
  createdAt: string
}

const ModuleSchema = new Schema<IModule>({
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

export const ModuleModel = model<IModule>('Module', ModuleSchema)
