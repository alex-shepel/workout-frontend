import React, { FC } from 'react';
import { ExercisesGroupSelection, ExercisesList } from 'components/exercises';
import { ExercisesProvider } from 'context/Exercises.context';

const ExercisesPage: FC = () => {
  return (
    <ExercisesProvider>
      <ExercisesGroupSelection />
      <ExercisesList />
    </ExercisesProvider>
  );
};

export default ExercisesPage;
