type TFormState = {
  title: string;
  description: string;
};

type TFormErrors = Record<keyof TFormState, string>;

export type { TFormState, TFormErrors };
