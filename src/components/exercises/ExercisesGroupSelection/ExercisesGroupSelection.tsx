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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TExercisesGroup } from 'types/db';
import { apiExercisesGroups } from 'api/services';
import { AddItemModal, DeleteConfirmationModal } from 'components/exercises/modals';
import { useAppContext } from 'hooks';
import { ExercisesContext } from 'context/Exercises';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import s from './styles';

const ExercisesGroupSelection: FC = () => {
  const { currentGroupId, selectGroupId } = useAppContext(ExercisesContext);
  const [isOpenAddGroupModal, setIsOpenAddGroupModal] = useState<boolean>(false);
  const [isOpenDeleteGroupModal, setIsOpenDeleteGroupModal] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const handleGetGroups = <T extends TExercisesGroup[] | undefined>(prevData: T, data: T) => {
    if (!data) {
      return;
    }
    if (data.length === 0) {
      setIsOpenAddGroupModal(true);
      return;
    }
    if (currentGroupId === null) {
      selectGroupId(data[0].ID);
      return;
    }
    if (!prevData) {
      return;
    }
    if (prevData.length - data.length > 0) {
      selectGroupId(data[0].ID);
      return;
    }
    if (prevData.length - data.length < 0) {
      selectGroupId(data[data.length - 1].ID);
      return;
    }
  };

  const { data: groups, isLoading } = useQuery<TExercisesGroup[]>(
    'groups',
    apiExercisesGroups.getAll,
    {
      onSuccess: data => handleGetGroups(groups, data),
    },
  );

  const postExercisesGroupMutation = useMutation(apiExercisesGroups.post, {
    onSuccess: () => queryClient.invalidateQueries('groups'),
  });

  const deleteExerciseGroupMutation = useMutation(apiExercisesGroups.deleteById, {
    onSuccess: () => queryClient.invalidateQueries('groups'),
  });

  const handleChange = (event: SelectChangeEvent) => {
    selectGroupId(Number(event.target.value));
  };

  const handleExercisesGroupSubmit = (formData: Pick<TExercisesGroup, 'Title' | 'Description'>) => {
    postExercisesGroupMutation.mutate(formData);
  };

  const handleExercisesGroupDelete = () => deleteExerciseGroupMutation.mutate(currentGroupId!);

  useEffect(() => {
    if (groups) {
      setIsOpenAddGroupModal(groups.length === 0);
      selectGroupId(s => (s === null ? groups[0].ID : s));
    }
  }, [groups, selectGroupId]);

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
      {currentGroupId !== null && (
        <Grid item xs={12} sx={s.selectForm}>
          <Button
            variant={'outlined'}
            color={'error'}
            onClick={() => setIsOpenDeleteGroupModal(true)}
          >
            <DeleteIcon />
          </Button>
          <FormControl fullWidth>
            <InputLabel id="muscles-group-select-label">Muscles Group</InputLabel>
            <Select
              labelId="muscles-group-select-label"
              id="muscles-group-select"
              value={String(currentGroupId)}
              label="Muscles Group"
              onChange={handleChange}
            >
              {groups?.map(group => (
                <MenuItem key={group.ID} value={group.ID}>
                  {group.Title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant={'outlined'} onClick={() => setIsOpenAddGroupModal(true)}>
            <AddIcon />
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        {currentGroupId !== null && (
          <Typography variant={'body2'}>
            {groups?.find(group => group.ID === currentGroupId)?.Description}
          </Typography>
        )}
      </Grid>
      <AddItemModal
        type={'group'}
        open={isOpenAddGroupModal}
        onClose={() => setIsOpenAddGroupModal(false)}
        onSubmit={handleExercisesGroupSubmit}
      />
      <DeleteConfirmationModal
        goal={'group'}
        open={isOpenDeleteGroupModal}
        onConfirm={handleExercisesGroupDelete}
        onClose={() => setIsOpenDeleteGroupModal(false)}
      />
    </Grid>
  );
};

export default ExercisesGroupSelection;
