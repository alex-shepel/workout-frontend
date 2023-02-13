import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useTrainingService } from 'hooks/services';
import { TrainingEntity } from 'types/entities';
import { ExerciseAccordion, TemplateSelection } from 'components/training';

const TrainingPage: FC = () => {
  const trainingService = useTrainingService();

  const { data: training, isLoading } = useQuery<TrainingEntity>(
    trainingService.endpoint,
    trainingService.getCurrent,
  );

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
      {training?.Template && (
        <Grid item xs={12}>
          <TemplateSelection template={training.Template} />
        </Grid>
      )}
      <Grid item xs={12}>
        {training?.Exercises?.map(exercise => (
          <ExerciseAccordion key={exercise.ID} exercise={exercise} />
        ))}
      </Grid>
    </Grid>
  );
};

export default TrainingPage;
