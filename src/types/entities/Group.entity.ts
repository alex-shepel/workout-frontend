import { AuthEntity, ExerciseEntity } from 'types/entities';

type GroupEntity = {
  ID: string;
  Title: string;
  Description: string;
  Exercises?: ExerciseEntity[];
  User?: AuthEntity;
};

export default GroupEntity;
