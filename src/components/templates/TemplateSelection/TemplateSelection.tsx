import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { TTemplate } from 'types/db';
import { AddItemModal, DeleteConfirmationModal } from 'components/modals';
import { useAppContext } from 'hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { TemplatesContext } from 'context/Templates';
import s from './styles';

const templates: TTemplate[] = [
  { ID: 1, Title: 'Hard', Description: 'The hard trainings template' },
  { ID: 2, Title: 'Easy', Description: 'The easy trainings template' },
];

const TemplateSelection: FC = () => {
  const { currentTemplateId, selectTemplateId } = useAppContext(TemplatesContext);
  const [isOpenAddTemplateModal, setIsOpenAddTemplateModal] = useState<boolean>(false);
  const [isOpenDeleteTemplateModal, setIsOpenDeleteTemplateModal] = useState<boolean>(false);

  useEffect(() => {
    selectTemplateId(templates[0].ID);
  }, [selectTemplateId]);

  const handleChange = (event: SelectChangeEvent) => {
    selectTemplateId(Number(event.target.value));
  };

  return (
    <Grid container mb={2} rowSpacing={2}>
      {currentTemplateId !== null && (
        <Grid item xs={12} sx={s.selectForm}>
          <Button
            variant={'outlined'}
            color={'error'}
            onClick={() => setIsOpenDeleteTemplateModal(true)}
          >
            <DeleteIcon />
          </Button>
          <FormControl fullWidth>
            <InputLabel id="training-template-select-label">Training Template</InputLabel>
            <Select
              labelId="training-template-select-label"
              id="training-template-select"
              value={String(currentTemplateId)}
              label="Training Template"
              onChange={handleChange}
            >
              {templates?.map(group => (
                <MenuItem key={group.ID} value={group.ID}>
                  {group.Title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant={'outlined'} onClick={() => setIsOpenAddTemplateModal(true)}>
            <AddIcon />
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        {currentTemplateId !== null && (
          <Typography variant={'body2'}>
            {templates?.find(template => template.ID === currentTemplateId)?.Description}
          </Typography>
        )}
      </Grid>
      <AddItemModal
        goal={'Template'}
        open={isOpenAddTemplateModal}
        onClose={() => setIsOpenAddTemplateModal(false)}
        onSubmit={console.log}
      />
      <DeleteConfirmationModal
        goal={'Template'}
        open={isOpenDeleteTemplateModal}
        onConfirm={console.log}
        onClose={() => setIsOpenDeleteTemplateModal(false)}
      />
    </Grid>
  );
};

export default TemplateSelection;
