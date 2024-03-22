import z from 'zod'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .max(50, { message: 'Email must not exceed 50 characters' })
    .regex(/^[\w\.]+@([\w-]+.)+[\w-]{2,4}$/, { message: 'Invalid email address' })
    .trim(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50, { message: 'Passwords must not exceed 50 characters' })
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Password must contain only letters and numbers' })
    .trim(),
  confirmPassword: z.string().trim(),
  username: z.string().min(1).trim()
})

const signUpSchema = schema.pick({ email: true, password: true, confirmPassword: true })
export const signUpSchemaRefined = signUpSchema.refine(
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
)
export type SignUpSchemaType = z.infer<typeof signUpSchemaRefined>

export const logInSchema = schema.pick({ email: true, password: true })
export type LogInSchemaType = z.infer<typeof logInSchema>
