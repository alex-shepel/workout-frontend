import React, { FC, useState } from 'react';
import { TExercise } from 'types/db';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './styles';

const ExerciseCard: FC<{ exercise: TExercise }> = props => {
  const { exercise: ex } = props;
  const [showsDescription, setShowsDescription] = useState<boolean>(false);
  return (
    <Card variant={'outlined'}>
      <CardContent>
        <Typography variant={'subtitle1'}>{ex.title}</Typography>
        {showsDescription && (
          <Typography variant={'body2'} color={'text.secondary'}>
            {ex.description}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={s.actions}>
        <Button
          aria-label={showsDescription ? 'collapse' : 'expand'}
          onClick={() => setShowsDescription(s => !s)}
        >
          <Typography variant={'body2'}>{showsDescription ? 'Collapse' : 'Expand'}</Typography>
          {showsDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        <IconButton aria-label="delete" onClick={() => alert('delete')}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ExerciseCard;
