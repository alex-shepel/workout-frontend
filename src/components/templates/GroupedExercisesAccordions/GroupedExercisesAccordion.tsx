import React, { FC } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  ExerciseEntity,
  GroupEntity,
  SimplifiedExerciseEntity,
  SimplifiedTemplateEntity,
} from 'types/entities';
import { ExtraServiceKey } from 'types/common';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useExercisesService, useTemplatesService } from 'hooks/services';
import { useAppContext } from 'hooks/utils';
import { TemplatesContext } from 'context/Templates.context';
import s from './styles';

interface Props {
  group: GroupEntity;
}

const TEMPLATES_QUERY_KEY: ExtraServiceKey<typeof useTemplatesService> = 'templates-with-exercises';

const GroupedExercisesAccordion: FC<Props> = props => {
  const { group } = props;

  const { currentTemplateId } = useAppContext(TemplatesContext);
  const templateId = currentTemplateId || '';

  const queryClient = useQueryClient();

  const exercisesService = useExercisesService();
  const templatesService = useTemplatesService();

  const { data: exercises, isLoading: areExercisesLoading } = useQuery<SimplifiedExerciseEntity[]>(
    [exercisesService.endpoint, group.ID],
    () => exercisesService.getByGroupId(group.ID),
  );

  const { data: template, isLoading: areRelationsLoading } = useQuery<SimplifiedTemplateEntity>(
    [TEMPLATES_QUERY_KEY, templateId],
    () => templatesService.getRelatedExercises(templateId),
    {
      enabled: templateId !== '',
    },
  );

  const { mutate: relateExercise } = useMutation(
    (payload: { exerciseId: ExerciseEntity['ID']; areRelated: boolean }) =>
      templatesService.relateExercise({
        ExerciseID: payload.exerciseId,
        TemplateID: templateId,
        AreRelated: payload.areRelated,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries([TEMPLATES_QUERY_KEY, templateId]),
    },
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
        {areExercisesLoading || areRelationsLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          exercises?.map(exercise => {
            const areRelated = !!template?.ExercisesIDs.includes(exercise.ID);
            return (
              <FormGroup sx={s.checkboxRow} key={exercise.ID}>
                <FormControlLabel
                  sx={s.checkboxLabel}
                  control={
                    <Checkbox
                      sx={s.checkboxIcon}
                      checked={areRelated}
                      onChange={() =>
                        relateExercise({ exerciseId: exercise.ID, areRelated: !areRelated })
                      }
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label={
                    <>
                      <Typography>{exercise.Title}</Typography>
                      <Typography variant={'caption'}>{exercise.Description}</Typography>
                    </>
                  }
                />
              </FormGroup>
            );
          })
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default GroupedExercisesAccordion;
