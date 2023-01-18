interface LoginFormValues {
  Email: '';
  Password: '';
}

interface LoginFormErrors extends Partial<Record<keyof LoginFormValues, string | null>> {}

export type { LoginFormValues, LoginFormErrors };
