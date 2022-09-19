import { z } from "zod"

export const CreateBook = z.object({
  bookName: z.string().min(3).max(100),
  author: z.string().min(3).max(100),
  thumbnail: z.string().min(3),
  price: z.string().min(1).max(1000000000),
  phone: z.string().min(10).max(10),
  status: z.string()
})
export const UpdateBook = z.object({
  id: z.number(),
  bookName: z.string().min(3).max(100),
  author: z.string().min(3).max(100),
  thumbnail: z.string().min(3),
  price: z.string().min(1).max(1000000000),
  phone: z.string().min(10).max(10),
  status: z.string()
})
