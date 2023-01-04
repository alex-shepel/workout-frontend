import { ExerciseEntity, UserEntity } from 'types/entities';

type GroupEntity = {
  ID: string;
  Title: string;
  Description: string;
  Exercises?: ExerciseEntity[];
  User?: UserEntity;
};

export default GroupEntity;
