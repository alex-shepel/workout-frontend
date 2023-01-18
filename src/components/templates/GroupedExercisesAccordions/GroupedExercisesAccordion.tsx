import React, { FC } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GroupEntity, SimplifiedExerciseEntity } from 'types/entities';
import { useQuery } from 'react-query';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useExercisesService } from 'hooks/services';
import s from './styles';

interface Props {
  group: GroupEntity;
}

const GroupedExercisesAccordion: FC<Props> = props => {
  const { group } = props;

  const exercisesService = useExercisesService();

  const { data: exercises, isLoading } = useQuery<SimplifiedExerciseEntity[]>(
    ['exercises', group.ID],
    () => exercisesService.getByGroupId(group.ID),
  );

  if (exercises && exercises.length === 0) return null;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${group.ID}-content`}
        id={`panel-${group.ID}-header`}
      >
        <Typography>{group.Title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading && <Typography>Loading...</Typography>}
        {!isLoading &&
          exercises?.map(exercise => (
            <FormGroup sx={s.checkboxRow} key={exercise.ID}>
              <FormControlLabel
                sx={s.checkboxLabel}
                control={<Checkbox sx={s.checkboxIcon} defaultChecked />}
                label={
                  <Box>
                    <Typography>{exercise.Title}</Typography>
                    <Typography variant={'caption'}>{exercise.Description}</Typography>
                  </Box>
                }
              />
            </FormGroup>
          ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default GroupedExercisesAccordion;
