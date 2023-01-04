import { ExerciseEntity, GroupEntity } from 'types/entities';

interface IProps {
  open: boolean;
  onClose: () => void;
  goal: 'Group' | 'Exercise' | 'Template';
  onSubmit: (data: TFormState) => void;
}

type TFormState =
  | Pick<GroupEntity, 'Title' | 'Description'>
  | Pick<ExerciseEntity, 'Title' | 'Description'>;

type TFormErrors = Record<keyof TFormState, string>;

export type { IProps, TFormState, TFormErrors };
