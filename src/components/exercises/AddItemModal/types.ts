import { TExercise, TExercisesGroup } from 'types/db';

type TProps = {
  open: boolean;
  onClose: () => void;
  type: 'group' | 'exercise';
  onSubmit: (data: TFormState) => void;
};

type TFormState =
  | Pick<TExercisesGroup, 'Title' | 'Description'>
  | Pick<TExercise, 'Title' | 'Description'>;

type TFormErrors = Record<keyof TFormState, string>;

export type { TProps, TFormState, TFormErrors };
