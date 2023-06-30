import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';
import { categories, locations } from './cow.constant';

const CowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: locations,
    },
    breed: {
      type: String,
      required: true,
    },
    weigth: {
      type: Number,
      required: true,
    },
    lebel: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: categories,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Cow = model<ICow, CowModel>('Cows', CowSchema);
