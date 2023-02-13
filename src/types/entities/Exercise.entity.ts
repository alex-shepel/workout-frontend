import { AuthEntity, GroupEntity, SetEntity, TemplateEntity } from 'types/entities';

type ExerciseEntity = {
  ID: string;
  Title: string;
  Description: string;
  Group?: GroupEntity;
  Sets?: SetEntity[];
  Templates?: TemplateEntity[];
  User?: AuthEntity;
};

export default ExerciseEntity;
