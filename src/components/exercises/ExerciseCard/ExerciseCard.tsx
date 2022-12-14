import React, { FC, useState } from 'react';
import { TExercise } from 'types/db';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { apiExercises } from 'api/services';
import { DeleteConfirmationModal } from 'components/modals';
import s from './styles';

const ExerciseCard: FC<{ exercise: TExercise }> = props => {
  const { exercise } = props;
  const [showsDescription, setShowsDescription] = useState<boolean>(false);
  const [isOpenDeleteExerciseModal, setIsOpenDeleteExerciseModal] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate: deleteExercise, isLoading: isDeleting } = useMutation(apiExercises.deleteById, {
    onSuccess: () => queryClient.invalidateQueries('exercises'),
  });

  if (isDeleting) {
    return (
      <Card variant={'outlined'}>
        <CardContent>
          <Typography>Deleting...</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant={'outlined'}>
      <CardContent>
        <Typography variant={'subtitle1'}>{exercise.Title}</Typography>
        {showsDescription && (
          <Typography variant={'body2'} color={'text.secondary'}>
            {exercise.Description}
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
        <IconButton
          aria-label={'delete'}
          color={'error'}
          onClick={() => setIsOpenDeleteExerciseModal(true)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <DeleteConfirmationModal
        goal={'Exercise'}
        open={isOpenDeleteExerciseModal}
        onConfirm={() => deleteExercise(exercise.ID)}
        onClose={() => setIsOpenDeleteExerciseModal(false)}
      />
    </Card>
  );
};

export default ExerciseCard;
