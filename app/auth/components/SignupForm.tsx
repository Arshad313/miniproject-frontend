import { Router, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
        onSubmit={async (values) => {
          console.log(values)
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else if (error.code === "P2002" && error.meta?.target?.includes("username")) {
              // This error comes from Prisma
              return { username: "This username is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="username" label="Username" placeholder="Enter the username" />
        <LabeledTextField name="email" label="Email" placeholder="Enter the email" />
        <LabeledTextField
          name="password"
          label="Password"
          placeholder="Enter the password"
          type="password"
        />
        <LabeledTextField
          name="confirmPassword"
          label="Confirm password"
          placeholder="Enter the password"
          type="password"
        />
      </Form>
    </div>
  )
}

export default SignupForm
