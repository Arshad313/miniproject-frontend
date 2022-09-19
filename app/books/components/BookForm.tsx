import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function BookForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="bookName" label="Name of Book" placeholder="Name" />
      <LabeledTextField name="author" label="Name of Author" placeholder="Author" />
      <LabeledTextField name="thumbnail" label="Thumbnail" placeholder="Thumbnail" />
      <LabeledTextField name="price" label="Price of book" placeholder="price" />
      <LabeledTextField name="phone" label="Phone Number" placeholder="phone" />
      {/* <LabeledTextField name="status" label="status" placeholder="status" /> */}
      <LabeledTextField name="isdonation" label="donation" placeholder="book type" />
    </Form>
  )
}
