import { SxProps } from '@mui/system';

const selectForm: SxProps = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gridGap: 8,
};

const newExercise: SxProps = {
  display: 'flex',
  justifyContent: 'center',
};

const styles = { selectForm, newExercise };

export default styles;
