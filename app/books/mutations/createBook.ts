import { resolver } from "blitz"
import db from "db"
import { string, z } from "zod"

const CreateBook = z.object({
  bookName: z.string(),
  author: z.string(),
  thumbnail: z.string(),
  price: z.string(),
  isdonation: string(),
  phone: z.string(),
  status: z.string(),
})

export default resolver.pipe(resolver.zod(CreateBook), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const book = await db.book.create({ data: input })

  return book
})
