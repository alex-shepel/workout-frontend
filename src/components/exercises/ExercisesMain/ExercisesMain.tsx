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
import { QueryFunction, useQuery } from 'react-query';
import { TExercisesGroup } from 'types/db';
import axios from 'api';
import s from './styles';

const fetchExercisesGroups: QueryFunction<TExercisesGroup[]> = async () => {
  const { data } = await axios.get('exercises-groups');
  return data;
};

const ExercisesMain: FC = () => {
  const [selectedGroupId, selectGroupId] = useState<number | null>(null);
  const [isOpenAddGroupModal, setIsOpenAddGroupModal] = useState<boolean>(false);
  const [isOpenAddExerciseModal, setIsOpenAddExerciseModal] = useState<boolean>(false);

  const { data: exercisesGroups, status } = useQuery<TExercisesGroup[]>(
    'exercisesGroups',
    fetchExercisesGroups,
  );

  const handleChange = (event: SelectChangeEvent) => {
    selectGroupId(Number(event.target.value));
  };

  useEffect(() => {
    if (exercisesGroups) {
      setIsOpenAddGroupModal(exercisesGroups.length === 0);
      selectGroupId(s => (s === null ? exercisesGroups[0].ID : s));
    }
  }, [exercisesGroups]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
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
      />
      <AddItemModal
        type={'exercise'}
        open={isOpenAddExerciseModal}
        onClose={() => setIsOpenAddExerciseModal(false)}
      />
    </Grid>
  );
};

export default ExercisesMain;
