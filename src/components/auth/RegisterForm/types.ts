interface RegisterFormValues {
  Email: '';
  Name: '';
  Password: '';
  PasswordConfirmation: '';
}

interface RegisterFormErrors extends Partial<Record<keyof RegisterFormValues, string | null>> {}

export type { RegisterFormValues, RegisterFormErrors };
