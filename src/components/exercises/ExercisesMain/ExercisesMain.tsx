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
import { AddItemModal, ExerciseCard } from 'components/exercises';
import { exercises } from 'data';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TExercise, TExercisesGroup } from 'types/db';
import { apiExercisesGroups } from 'api/services';
import s from './styles';

const ExercisesMain: FC = () => {
  const [selectedGroupId, selectGroupId] = useState<number | null>(null);
  const [isOpenAddGroupModal, setIsOpenAddGroupModal] = useState<boolean>(false);
  const [isOpenAddExerciseModal, setIsOpenAddExerciseModal] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const {
    data: exercisesGroups,
    isLoading,
    isError,
  } = useQuery<TExercisesGroup[]>('exercisesGroups', apiExercisesGroups.getAll);

  const postExercisesGroupMutation = useMutation(apiExercisesGroups.post, {
    onSuccess: () => {
      queryClient.invalidateQueries('exercisesGroups');
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    selectGroupId(Number(event.target.value));
  };

  const handleExercisesGroupSubmit = (formData: Pick<TExercisesGroup, 'Title' | 'Description'>) => {
    postExercisesGroupMutation.mutate(formData);
  };

  const handleExerciseSubmit = (formData: Pick<TExercise, 'Title' | 'Description'>) => {
    alert(JSON.stringify({ ...formData, GroupID: selectedGroupId }, null, 2));
  };

  useEffect(() => {
    if (exercisesGroups) {
      setIsOpenAddGroupModal(exercisesGroups.length === 0);
      selectGroupId(s => (s === null ? exercisesGroups[0].ID : s));
    }
  }, [exercisesGroups]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Fetch ERROR!</p>;
  }

  return (
    <Grid container rowSpacing={2} sx={s.container}>
      <Grid item xs={12}>
        {selectedGroupId && (
          <FormControl sx={s.selectForm} fullWidth>
            <InputLabel id="muscles-group-select-label">Muscles Group</InputLabel>
            <Select
              labelId="muscles-group-select-label"
              id="muscles-group-select"
              value={String(selectedGroupId)}
              label="Muscles Group"
              onChange={handleChange}
            >
              {exercisesGroups?.map(group => (
                <MenuItem key={group.ID} value={group.ID}>
                  {group.Title}
                </MenuItem>
              ))}
            </Select>
            <Button variant={'outlined'} onClick={() => setIsOpenAddGroupModal(true)}>
              Add Group
            </Button>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={12}>
        {selectedGroupId && (
          <Typography variant={'body2'}>
            {exercisesGroups!.find(group => group.ID === selectedGroupId)!.Description}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Grid container rowSpacing={1}>
          {exercises
            .filter(ex => ex.GroupID === selectedGroupId)
            .map(ex => (
              <Grid key={ex.ID} xs={12} item>
                <ExerciseCard exercise={ex} />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12} sx={s.newExercise}>
        <Button variant={'outlined'} onClick={() => setIsOpenAddExerciseModal(true)}>
          Add Exercise
        </Button>
      </Grid>
      <AddItemModal
        type={'group'}
        open={isOpenAddGroupModal}
        onClose={() => setIsOpenAddGroupModal(false)}
        onSubmit={handleExercisesGroupSubmit}
      />
      <AddItemModal
        type={'exercise'}
        open={isOpenAddExerciseModal}
        onClose={() => setIsOpenAddExerciseModal(false)}
        onSubmit={handleExerciseSubmit}
      />
    </Grid>
  );
};

export default ExercisesMain;
