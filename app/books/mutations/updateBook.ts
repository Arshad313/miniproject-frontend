import { resolver } from "blitz"
import db from "db"
import { string, z } from "zod"

const UpdateBook = z.object({
  id: z.number(),
  bookName: z.string(),
  author: z.string(),
  thumbnail: z.string(),
  price: z.string(),
  isdonation: string(),
  phone: z.string(),
  status: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateBook),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const book = await db.book.update({ where: { id }, data })

    return book
  }
)
