import { z } from 'zod';
import { categories, locations } from './cow.constant';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    age: z.number({ required_error: 'Age is required' }),
    price: z.number({ required_error: 'Price is required' }),
    location: z.enum([...locations] as [string, ...string[]]),
    breed: z.string({ required_error: 'Breed is required' }),
    weigth: z.number({ required_error: 'Weigth is required' }),
    lebel: z.string({ required_error: 'Level is required' }),
    category: z.enum([...categories] as [string, ...string[]]),
    seller: z.string().optional(),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...locations] as [string, ...string[]]).optional(),
    breed: z.string().optional(),
    weight: z.number().optional(),
    level: z.string().optional(),
    category: z.enum([...categories] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const cowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
