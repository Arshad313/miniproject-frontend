import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Field, useField } from "formik"
import { useState } from "react"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function BookForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  console.log("BookForm")
  return (
    <Form<S> {...props}>
      <LabeledTextField name="bookName" label="Name of Book" placeholder="Name" />
      <LabeledTextField name="author" label="Name of Author" placeholder="Author" />
      <LabeledTextField name="thumbnail" label="Thumbnail" placeholder="Thumbnail" />
      <LabeledTextField name="phone" label="Phone Number" placeholder="phone" />
      {/* <LabeledTextField name="status" label="status" placeholder="status" /> */}
      <label htmlFor="isdonation">
        donation
        <Field as="select" name="isdonation">
          <option value="">(Select Donation option)</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </Field>
        <br />
      </label>
      <LabeledTextField name="price" label="Price of book" placeholder="price" />

      <style jsx>{`
        label {
          display: flex;
          flex-direction: column;
          align-items: start;
          font-size: 1rem;
        }
        select {
          font-size: 1rem;
          padding: 0.25rem 0.5rem;
          border-radius: 3px;
          border: 1px solid purple;
          appearance: none;
          margin-top: 0.5rem;
        }
      `}</style>
    </Form>
  )
}
