import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
import { TemplateEntity } from 'types/entities';
import { AddItemModal, DeleteConfirmationModal } from 'components/modals';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { TemplatesContext } from 'context/Templates.context';
import { useAppContext } from 'hooks/utils';
import { useTemplatesService } from 'hooks/services';
import s from './styles';

const TemplateSelection: FC = () => {
  const templatesService = useTemplatesService();
  const { currentTemplateId, selectTemplateId } = useAppContext(TemplatesContext);
  const [isOpenAddTemplateModal, setIsOpenAddTemplateModal] = useState<boolean>(false);
  const [isOpenDeleteTemplateModal, setIsOpenDeleteTemplateModal] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const handleGetTemplates = <T extends TemplateEntity[] | undefined>(prevData: T, data: T) => {
    if (!data) {
      return;
    }
    if (data.length === 0) {
      setIsOpenAddTemplateModal(true);
      return;
    }
    if (currentTemplateId === null) {
      selectTemplateId(data[0].ID);
      return;
    }
    if (!prevData) {
      return;
    }
    if (prevData.length - data.length > 0) {
      selectTemplateId(data[0].ID);
      return;
    }
    if (prevData.length - data.length < 0) {
      selectTemplateId(data[data.length - 1].ID);
      return;
    }
  };

  const { data: templates, isLoading } = useQuery<TemplateEntity[]>(
    'templates',
    templatesService.getAll,
    { onSuccess: data => handleGetTemplates(templates, data) },
  );

  const { mutate: postTemplate, isLoading: isPosting } = useMutation(templatesService.post, {
    onSuccess: () => queryClient.invalidateQueries('templates'),
  });

  const { mutate: deleteTemplate, isLoading: isDeleting } = useMutation(
    templatesService.deleteById,
    { onSuccess: () => queryClient.invalidateQueries('templates') },
  );

  const handleChange = (event: SelectChangeEvent) => {
    selectTemplateId(event.target.value);
  };

  const handleTemplateDelete = () => deleteTemplate(currentTemplateId!);

  useEffect(() => {
    if (!templates) return;
    if (templates.length === 0) setIsOpenAddTemplateModal(templates.length === 0);
    if (templates.length > 0) selectTemplateId(s => (s === null ? templates[0].ID : s));
  }, [templates, selectTemplateId]);

  if (isLoading || isPosting || isDeleting) {
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
        onSubmit={postTemplate}
      />
      <DeleteConfirmationModal
        goal={'Template'}
        open={isOpenDeleteTemplateModal}
        onConfirm={handleTemplateDelete}
        onClose={() => setIsOpenDeleteTemplateModal(false)}
      />
    </Grid>
  );
};

export default TemplateSelection;
