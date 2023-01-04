import { GroupEntity, TemplateEntity, UserEntity } from 'types/entities';

type ExerciseEntity = {
  ID: string;
  Title: string;
  Description: string;
  Group?: GroupEntity;
  Templates?: TemplateEntity[];
  User?: UserEntity;
};

export default ExerciseEntity;
