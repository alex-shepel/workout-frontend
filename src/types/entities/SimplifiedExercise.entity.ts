import { ExerciseEntity, GroupEntity } from 'types/entities';

type SimplifiedExerciseEntity = Pick<ExerciseEntity, 'ID' | 'Title' | 'Description'> & {
  GroupID: GroupEntity['ID'];
};

export default SimplifiedExerciseEntity;
