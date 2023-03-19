import React, { FC } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useTrainingService } from 'hooks/services';
import { TrainingEntity } from 'types/entities';
import { ExerciseAccordion, TemplateSelection } from 'components/training';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import s from './styles';

const TrainingPage: FC = () => {
  const queryClient = useQueryClient();
  const trainingService = useTrainingService();

  const { data: training, isLoading } = useQuery<TrainingEntity>(
    trainingService.endpoint,
    trainingService.getCurrent,
  );

  const { mutate: next } = useMutation(trainingService.next, {
    onSuccess: data => {
      queryClient.setQueryData(trainingService.endpoint, data);
      queryClient.invalidateQueries('templates-current');
    },
  });

  if (isLoading) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container mb={2} rowSpacing={2}>
      <Grid item xs={12}>
        <TemplateSelection />
      </Grid>
      <Grid item xs={12}>
        {training?.Exercises?.map(exercise => (
          <ExerciseAccordion key={exercise.ID} exercise={exercise} />
        ))}
      </Grid>
      <Grid item xs={12} sx={s.nextRow}>
        <Button color={'primary'} onClick={() => next()}>
          Next training
          <NavigateNextIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default TrainingPage;
