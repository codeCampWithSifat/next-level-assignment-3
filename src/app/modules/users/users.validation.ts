import { z } from 'zod';
// import { role } from './users.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'Password Is Required' }),
    role: z.enum(['seller', 'buyer'], {
      required_error: 'Role is Required',
    }),
    name: z.object({
      firstName: z.string({ required_error: 'First Name Is Required' }),
      lastName: z.string({ required_error: 'Last Name Is Required' }),
    }),
    phoneNumber: z.string({ required_error: 'Phone Number Is Required' }),
    address: z.string({ required_error: 'Phone Number is Required' }),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
