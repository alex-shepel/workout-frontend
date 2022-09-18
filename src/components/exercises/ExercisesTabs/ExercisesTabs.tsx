import React, { FC, ReactNode, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { exercisesGroups } from 'data';
import s from './styles';

const GroupPanel: FC<{ children: ReactNode }> = props => {
  const { children } = props;
  return <Typography>{children}</Typography>;
};

const ExercisesTabs: FC = () => {
  const [selectedGroupId, selectGroupId] = useState(exercisesGroups[0].id);

  const handleChange = (event: SelectChangeEvent) => {
    selectGroupId(event.target.value);
  };

  return (
    <Box>
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
            <MenuItem value={group.id}>{group.title}</MenuItem>
          ))}
        </Select>
        <Button variant={'outlined'}>
          <AddIcon />
        </Button>
      </FormControl>
      {exercisesGroups.map(
        group => group.id === selectedGroupId && <GroupPanel>{group.description}</GroupPanel>,
      )}
    </Box>
  );
};

export default ExercisesTabs;
