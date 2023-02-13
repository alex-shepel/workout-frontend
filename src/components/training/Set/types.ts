import { SetEntity } from 'types/entities';

export interface Props {
  set: SetEntity;
  onComplete: (values: { ID: string; Weight: number; Repetitions: number }) => void;
}

export interface FormValues {
  Weight: `${number}`;
  Repetitions: `${number}`;
}
