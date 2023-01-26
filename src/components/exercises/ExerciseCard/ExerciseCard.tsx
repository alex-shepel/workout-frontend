import React, { FC, useEffect, useState } from 'react';
import { SimplifiedExerciseEntity } from 'types/entities';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQueryClient } from 'react-query';
import { DeleteConfirmationModal } from 'components/modals';
import { useExercisesService } from 'hooks/services';
import gs from 'global-styles';
import s from './styles';

const ExerciseCard: FC<{ exercise: SimplifiedExerciseEntity }> = props => {
  const { exercise } = props;
  const [showsDescription, setShowsDescription] = useState<boolean>(false);
  const [showsDeleteModal, setShowsDeleteModal] = useState<boolean>(false);
  const [showsEditModal, setShowsEditModal] = useState<boolean>(false);

  const exercisesService = useExercisesService();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('showsEditModal =>', showsEditModal);
  }, [showsEditModal]);

  const { mutate: deleteExercise, isLoading: isDeleting } = useMutation(
    exercisesService.deleteById,
    {
      onSuccess: () => queryClient.invalidateQueries(exercisesService.endpoint),
    },
  );

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
      <CardContent sx={s.content}>
        <Typography variant={'subtitle1'}>{exercise.Title}</Typography>
        <Typography
          variant={'body2'}
          color={'text.secondary'}
          sx={showsDescription ? undefined : gs.ellipsisOverflow}
        >
          {exercise.Description}
        </Typography>
        <Button onClick={() => setShowsDescription(s => !s)} sx={s.expander}>
          {showsDescription ? 'less' : 'more'}
        </Button>
      </CardContent>
      <CardActions sx={s.actions}>
        <IconButton aria-label={'edit'} color={'primary'} onClick={() => setShowsEditModal(true)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label={'delete'} color={'error'} onClick={() => setShowsDeleteModal(true)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <DeleteConfirmationModal
        goal={'Exercise'}
        open={showsDeleteModal}
        onConfirm={() => deleteExercise(exercise.ID)}
        onClose={() => setShowsDeleteModal(false)}
      />
    </Card>
  );
};

export default ExerciseCard;
