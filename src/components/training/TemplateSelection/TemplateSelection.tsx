import React, { FC } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useTemplatesService, useTrainingService } from 'hooks/services';
import { TemplateEntity } from 'types/entities';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { ExtraServiceKey } from 'types/common';

const CURRENT_TEMPLATE_SERVICE_KEY: ExtraServiceKey<typeof useTemplatesService> =
  'templates-current';

const TemplateSelection: FC = () => {
  const queryClient = useQueryClient();
  const trainingService = useTrainingService();
  const templatesService = useTemplatesService();

  const { data: templates, isLoading: isLoadingAll } = useQuery<TemplateEntity[]>(
    templatesService.endpoint,
    templatesService.getAll,
  );

  const { data: current, isLoading: isLoadingCurrent } = useQuery<TemplateEntity>(
    CURRENT_TEMPLATE_SERVICE_KEY,
    templatesService.current,
  );

  const { mutate: select } = useMutation(templatesService.updateCurrent, {
    onSuccess: data => {
      queryClient.setQueryData(CURRENT_TEMPLATE_SERVICE_KEY, data);
      queryClient.invalidateQueries(trainingService.endpoint);
    },
  });

  const handleSelectTemplate = (e: SelectChangeEvent<TemplateEntity['ID']>) => {
    select({ ID: e.target.value });
  };

  if (isLoadingAll || isLoadingCurrent) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <form>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="training-template-select-label">Training Template</InputLabel>
            <Select
              labelId="training-template-select-label"
              id="training-template-select"
              value={current?.ID}
              label="Training Template"
              onChange={handleSelectTemplate}
            >
              {templates?.map(template => (
                <MenuItem key={template.ID} value={template.ID}>
                  {template.Title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant={'body2'}>{current?.Description}</Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default TemplateSelection;
