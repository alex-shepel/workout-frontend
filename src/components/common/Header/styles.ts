import { SxProps } from '@mui/system';

const toolbar: SxProps = {
  '& > button': {
    margin: 0,
    padding: 0,
  },
};

const commonToolbar: SxProps = {
  ...toolbar,
  justifyContent: 'space-between',
};

const authToolbar: SxProps = {
  ...toolbar,
  justifyContent: 'center',
};

const styles = { commonToolbar, authToolbar };

export default styles;
