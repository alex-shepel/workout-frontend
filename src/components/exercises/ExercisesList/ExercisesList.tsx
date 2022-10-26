import React, { FC, useEffect, useState } from 'react';
import { TExercise } from 'types/db';
import { Button, Grid, Typography } from '@mui/material';
import { ExerciseCard } from 'components/exercises';
import { AddItemModal } from 'components/modals';
import { useAppContext } from 'hooks';
import { ExercisesContext } from 'context/Exercises';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { apiExercises } from 'api/services';
import s from './styles';

const ExercisesList: FC = () => {
  const { currentGroupId } = useAppContext(ExercisesContext);
  const [isOpenAddExerciseModal, setIsOpenAddExerciseModal] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const {
    data: exercises,
    isLoading,
    isError,
    error,
  } = useQuery<TExercise[]>(
    ['exercises', currentGroupId],
    () => apiExercises.getByGroupId(currentGroupId!),
    {
      enabled: currentGroupId !== null,
    },
  );

  const postExerciseMutation = useMutation(apiExercises.post, {
    onSuccess: () => queryClient.invalidateQueries('exercises'),
  });

  const handleExerciseSubmit = (formData: Pick<TExercise, 'Title' | 'Description'>) => {
    postExerciseMutation.mutate({ ...formData, GroupID: currentGroupId! });
  };

  useEffect(() => {
    if (currentGroupId) {
      queryClient.invalidateQueries('exercises');
    }
  }, [currentGroupId, queryClient]);

  if (isLoading) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
        </Grid>
      </Grid>
    );
  }

  if (isError) {
    return error instanceof Error ? (
      <Grid container>
        <Grid item xs={12}>
          <Typography component={'span'}>An</Typography>
          <Typography component={'span'} color={'error.main'}>
            {' '}
            ERROR
          </Typography>
          <Typography component={'span'}>
            {' '}
            occurred while loading the data: {error.message}!
          </Typography>
        </Grid>
      </Grid>
    ) : (
      <Grid container>
        <Grid item xs={12}>
          <Typography component={'span'}>An unknown</Typography>
          <Typography component={'span'} color={'error.main'}>
            {' '}
            ERROR
          </Typography>
          <Typography component={'span'}> occurred while loading the data!</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <Grid container rowSpacing={1}>
          {exercises?.map(ex => (
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
        goal={'Exercise'}
        open={isOpenAddExerciseModal}
        onClose={() => setIsOpenAddExerciseModal(false)}
        onSubmit={handleExerciseSubmit}
      />
    </Grid>
  );
};

export default ExercisesList;
