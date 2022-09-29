import React, { FC, useState } from 'react';
import { TExercise } from 'types/db';
import { Button, Grid } from '@mui/material';
import { exercises } from 'data/index';
import { AddItemModal, ExerciseCard } from 'components/exercises';
import { useAppContext } from 'hooks';
import { ExercisesContext } from 'context/Exercises';
import s from './styles';

const ExercisesList: FC = () => {
  const { currentGroupId } = useAppContext(ExercisesContext);
  const [isOpenAddExerciseModal, setIsOpenAddExerciseModal] = useState<boolean>(false);

  const handleExerciseSubmit = (formData: Pick<TExercise, 'Title' | 'Description'>) => {
    alert(JSON.stringify({ ...formData, GroupID: currentGroupId }, null, 2));
  };

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <Grid container rowSpacing={1}>
          {exercises
            .filter(ex => ex.GroupID === currentGroupId)
            .map(ex => (
              <Grid key={ex.ID} xs={12} item>
                <ExerciseCard exercise={ex} />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12} sx={s.newExercise}>
        <Button variant={'outlined'} onClick={() => setIsOpenAddExerciseModal(true)}>
          Add Exercise
        </Button>
      </Grid>
      <AddItemModal
        type={'exercise'}
        open={isOpenAddExerciseModal}
        onClose={() => setIsOpenAddExerciseModal(false)}
        onSubmit={handleExerciseSubmit}
      />
    </Grid>
  );
};

export default ExercisesList;
