import { SxProps } from '@mui/system';

const content: SxProps = {
  paddingBottom: 0.5,
};

const expander: SxProps = {
  padding: 0,
  justifyContent: 'start',
};

const actions: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
};

const styles = { actions, expander, content };

export default styles;
