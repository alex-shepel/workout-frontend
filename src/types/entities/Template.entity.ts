import { ExerciseEntity, UserEntity } from 'types/entities';

type TemplateEntity = {
  ID: string;
  Title: string;
  Description: string;
  Exercises?: ExerciseEntity[];
  User?: UserEntity;
};

export default TemplateEntity;
