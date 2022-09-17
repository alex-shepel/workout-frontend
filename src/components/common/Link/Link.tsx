import React, { FC } from 'react';
import { Link as MaterialLink } from '@mui/material';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

const Link: FC<LinkProps> = props => (
  <MaterialLink {...props} component={RouterLink}>
    {props.children}
  </MaterialLink>
);

export default Link;
