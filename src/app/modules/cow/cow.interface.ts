import { Model, Types } from 'mongoose';
import { IUser } from '../users/users.interface';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'Barishal'
    | 'Rajshahi'
    | 'Sylhet'
    | 'Comilla'
    | 'Rangpur'
    | 'Mymensingh';

  breed: string;
  weigth: number;
  lebel: string;
  category: 'Dairy' | 'Beef' | 'Dual Purpose';
  seller?: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

// export const cowFilterableFields = [
//   'searchTerm',
//   'location',
//   'breed',
//   'category',
// ];

export type ICowFilters = {
  searchTerm?: string;
  location?: string;
  breed?: string;
  category?: string;
};
