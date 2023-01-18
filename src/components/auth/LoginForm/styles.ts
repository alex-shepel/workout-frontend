import { SxProps } from '@mui/system';

const content: SxProps = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  rowGap: 2,
  '& > button': {
    marginTop: 2,
  },
};

const primaryButton: SxProps = {
  display: 'flex',
  gap: 1,
};

const styles = { content, primaryButton };

export default styles;
