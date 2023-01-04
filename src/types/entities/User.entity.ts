import { ExerciseEntity, GroupEntity, TemplateEntity } from 'types/entities';

type UserEntity = {
  ID: string;
  Name: string;
  Email: string;
  Exercises?: ExerciseEntity[];
  Groups?: GroupEntity[];
  Templates?: TemplateEntity[];
};

export default UserEntity;
