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
import { Props } from './types';

const TemplateSelection: FC<Props> = props => {
  const { template } = props;

  const queryClient = useQueryClient();
  const trainingService = useTrainingService();
  const templatesService = useTemplatesService();

  const { data: templates, isLoading } = useQuery<TemplateEntity[]>(
    templatesService.endpoint,
    templatesService.getAll,
  );

  const { mutate: change } = useMutation(trainingService.updateCurrent, {
    onSuccess: data => {
      queryClient.setQueryData(trainingService.endpoint, data);
    },
  });

  const handleSelectTemplate = (e: SelectChangeEvent<TemplateEntity['ID']>) => {
    change({ TemplateID: e.target.value });
  };

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
    <form>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="training-template-select-label">Training Template</InputLabel>
            <Select
              labelId="training-template-select-label"
              id="training-template-select"
              value={template.ID}
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
          <Typography variant={'body2'}>{template.Description}</Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default TemplateSelection;
