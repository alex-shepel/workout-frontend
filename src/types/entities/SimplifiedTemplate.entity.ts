import { ExerciseEntity, TemplateEntity } from 'types/entities';

type SimplifiedTemplateEntity = Pick<TemplateEntity, 'ID' | 'Title' | 'Description'> & {
  ExercisesIDs: Array<ExerciseEntity['ID']>;
};

export default SimplifiedTemplateEntity;
