import { ExerciseEntity, UserEntity } from 'types/entities';

type SetEntity = {
  ID: string;

  CreatedDate: Date;
  SequentialNumber: number;

  Weight: number;

  Repetitions: number;
  Completed: boolean;

  Exercise?: ExerciseEntity;

  Training?: SetEntity;

  User?: UserEntity;
};

export default SetEntity;
