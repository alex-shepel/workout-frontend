import React, { FC } from 'react';
import { ExercisesTabsProvider } from 'context/ExercisesTabs';
import { ExercisesTabs } from 'components/exercises';

const ExercisesPage: FC = () => {
  return (
    <ExercisesTabsProvider>
      <ExercisesTabs />
    </ExercisesTabsProvider>
  );
};

export default ExercisesPage;
