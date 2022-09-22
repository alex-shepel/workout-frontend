import React, { FC, useState } from 'react';
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
import { exercises, exercisesGroups } from 'data';
import s from './styles';

const ExercisesTabs: FC = () => {
  const [selectedGroupId, selectGroupId] = useState<string>(exercisesGroups[0].id);
  const [isOpenAddGroupModal, setIsOpenAddGroupModal] = useState<boolean>(
    exercisesGroups.length === 0,
  );
  const [isOpenAddExerciseModal, setIsOpenAddExerciseModal] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    selectGroupId(event.target.value);
  };

  const activeGroup = exercisesGroups.find(group => group.id === selectedGroupId)!;

  return (
    <Grid container rowSpacing={2} sx={s.container}>
      <Grid item xs={12}>
        <FormControl sx={s.selectForm} fullWidth>
          <InputLabel id="muscles-group-select-label">Muscles Group</InputLabel>
          <Select
            labelId="muscles-group-select-label"
            id="muscles-group-select"
            value={selectedGroupId}
            label="Muscles Group"
            onChange={handleChange}
          >
            {exercisesGroups.map(group => (
              <MenuItem key={group.id} value={group.id}>
                {group.title}
              </MenuItem>
            ))}
          </Select>
          <Button variant={'outlined'} onClick={() => setIsOpenAddGroupModal(true)}>
            Add Group
          </Button>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'body2'}>{activeGroup.description}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container rowSpacing={1}>
          {exercises
            .filter(ex => ex.groupId === selectedGroupId)
            .map(ex => (
              <Grid key={ex.id} xs={12} item>
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

export default ExercisesTabs;
