import React, { FC } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SimplifiedExerciseEntity, GroupEntity } from 'types/entities';
import { apiExercises } from 'api/services';
import { useQuery } from 'react-query';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import s from './styles';

interface Props {
  group: GroupEntity;
}

const GroupedExercisesAccordion: FC<Props> = props => {
  const { group } = props;

  const { data: exercises, isLoading } = useQuery<SimplifiedExerciseEntity[]>(
    ['exercises', group.ID],
    () => apiExercises.getByGroupId(group.ID),
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
