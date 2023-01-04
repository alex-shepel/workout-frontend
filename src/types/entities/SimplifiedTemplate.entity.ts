import { SimplifiedExerciseEntity } from 'types/entities';

type SimplifiedTemplateEntity = {
  ID: string;
  Title: string;
  Description: string;
  ExercisesIDs: SimplifiedExerciseEntity['ID'];
};

export default SimplifiedTemplateEntity;
