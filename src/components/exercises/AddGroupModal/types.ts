import { TMap } from 'types/utils';

type TFormState = {
  title: string;
  description: string;
};

type TFormErrors = TMap<string, keyof TFormState>;

export type { TFormState, TFormErrors };
