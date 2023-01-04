import React, { FC, useEffect, useState } from 'react';
import { SimplifiedExerciseEntity } from 'types/entities';
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

  const { data: exercises, isLoading } = useQuery<SimplifiedExerciseEntity[]>(
    ['exercises', currentGroupId],
    () => apiExercises.getByGroupId(currentGroupId!),
    {
      enabled: currentGroupId !== null,
    },
  );

  const { mutate: postExercise, isLoading: isPosting } = useMutation(apiExercises.post, {
    onSuccess: () => queryClient.invalidateQueries('exercises'),
  });

  const handleExerciseSubmit = (
    formData: Pick<SimplifiedExerciseEntity, 'Title' | 'Description'>,
  ) => {
    postExercise({ ...formData, GroupID: currentGroupId! });
  };

  useEffect(() => {
    if (currentGroupId) {
      queryClient.invalidateQueries('exercises');
    }
  }, [currentGroupId, queryClient]);

  if (isLoading || isPosting) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
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
