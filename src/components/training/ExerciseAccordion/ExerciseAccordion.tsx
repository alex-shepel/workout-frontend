import React, { FC } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import useSetService from 'hooks/services/useSet.service';
import { useMutation, useQueryClient } from 'react-query';
import { useTrainingService } from 'hooks/services';
import { Set } from 'components/training';
import { Props } from './types';
import { Grid } from '@mui/material';

const ExerciseAccordion: FC<Props> = props => {
  const { exercise } = props;

  const queryClient = useQueryClient();
  const setService = useSetService();
  const trainingService = useTrainingService();

  const { mutate: complete } = useMutation(setService.complete, {
    onSuccess: () => queryClient.invalidateQueries(trainingService.endpoint),
  });

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${exercise.ID}-content`}
        id={`panel-${exercise.ID}-header`}
      >
        <Typography>{exercise.Title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant={'body2'} mb={2}>
          {exercise.Description}
        </Typography>
        <Grid container rowGap={2}>
          {exercise.Sets?.map(set => (
            <Grid xs={12} key={set.ID} item>
              <Set set={set} onComplete={complete} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExerciseAccordion;
