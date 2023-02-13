import { ExerciseEntity, SetEntity, UserEntity } from 'types/entities';
import TemplateEntity from 'types/entities/Template.entity';

type TrainingEntity = {
  ID: string;
  CreatedDate: string;
  UpdatedDate: string;
  Completed: boolean;
  Template?: TemplateEntity;
  Exercises?: ExerciseEntity[];
  Sets?: SetEntity[];
  User?: UserEntity;
};

export default TrainingEntity;
