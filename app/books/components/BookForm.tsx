import { FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Field } from "formik"
import { PropsWithoutRef, ReactNode, useState } from "react"
import { z } from "zod"
import { Formik, FormikProps } from "formik"
import { validateZodSchema } from "blitz"

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}
export const FORM_ERROR = "FORM_ERROR"
export interface BookFormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: FormikProps<z.infer<S>>["initialValues"]
}
export function BookForm<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const [formError, setFormError] = useState<string | null>(null)
  return (
    <Formik
      initialValues={initialValues || {}}
      validate={validateZodSchema(schema)}
      onSubmit={async (values, { setErrors }) => {
        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {}

        if (FORM_ERROR) {
          setFormError(FORM_ERROR)
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors)
        }
      }}
    >
      {({ handleSubmit, isSubmitting, values }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
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
          <label htmlFor="status">
            status
            <Field as="select" name="status">
              <option value="">(Select book status)</option>
              <option value="Active">Active</option>
              <option value="Sold Out">Sold Out</option>
            </Field>
            <br />
          </label>
          {values.isdonation === "0" && (
            <LabeledTextField name="price" label="Price of book" placeholder="price" />
          )}

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

          {formError && (
            <div role="alert" style={{ color: "red" }}>
              {formError}
            </div>
          )}

          {submitText && (
            <button type="submit" disabled={isSubmitting}>
              {submitText}
            </button>
          )}

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    </Formik>
  )
}
