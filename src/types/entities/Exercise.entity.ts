import { AuthEntity, GroupEntity, TemplateEntity } from 'types/entities';

type ExerciseEntity = {
  ID: string;
  Title: string;
  Description: string;
  Group?: GroupEntity;
  Templates?: TemplateEntity[];
  User?: AuthEntity;
};

export default ExerciseEntity;
