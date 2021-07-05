import mongoose from 'mongoose';

const { Schema, model } = mongoose;

interface IModule {
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
