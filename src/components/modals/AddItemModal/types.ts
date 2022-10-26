import { TExercise, TExercisesGroup } from 'types/db';

interface IProps {
  open: boolean;
  onClose: () => void;
  goal: 'Group' | 'Exercise' | 'Template';
  onSubmit: (data: TFormState) => void;
}

type TFormState =
  | Pick<TExercisesGroup, 'Title' | 'Description'>
  | Pick<TExercise, 'Title' | 'Description'>;

type TFormErrors = Record<keyof TFormState, string>;

export type { IProps, TFormState, TFormErrors };
