import { z } from "zod"

export const CreateBook = z.object({
  bookName: z.string().min(3).max(100),
  author: z.string().min(3).max(100),
  thumbnail: z.string().min(3),
  price: z.string().min(0).max(1000000000).nullish(),
  isdonation: z.string(),
  phone: z.string().min(10).max(10),
  status: z.string().nullish(),
})
export const UpdateBook = z.object({
  id: z.number(),
  bookName: z.string().min(3).max(100),
  author: z.string().min(3).max(100),
  thumbnail: z.string().min(3),
  phone: z.string().min(10).max(10),
  price: z.string().min(0).max(1000000000).nullish(),
  isdonation: z.string(),
  status: z.string().nullish(),
})
