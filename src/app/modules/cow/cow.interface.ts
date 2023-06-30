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
  catagory: 'Dairy' | 'Beef' | 'Dual Purpose';
  seller?: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
