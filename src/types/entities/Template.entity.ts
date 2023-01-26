import { ExerciseEntity } from 'types/entities';

type TemplateEntity = {
  ID: string;
  Title: string;
  Description: string;
  Exercises?: ExerciseEntity[];
};

export default TemplateEntity;
