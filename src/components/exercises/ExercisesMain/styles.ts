import { SxProps } from '@mui/system';

const container: SxProps = {
  mt: 2,
};

const selectForm: SxProps = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gridGap: 8,
};

const newExercise: SxProps = {
  display: 'flex',
  justifyContent: 'center',
};

const styles = { container, selectForm, newExercise };

export default styles;
