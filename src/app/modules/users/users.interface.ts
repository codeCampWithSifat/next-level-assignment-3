import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

// export const userFilterableFields = ['phoneNumber', 'role', 'address'];

export type IUserFilterableFields = {
  searchTerm?: string;
  phoneNumber?: string;
  role?: string;
  address?: string;
};
