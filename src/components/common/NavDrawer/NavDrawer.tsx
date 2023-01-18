import React, { FC } from 'react';
import { NavDrawerContext } from 'context/NavDrawer.context';
import { List, ListItem, SwipeableDrawer } from '@mui/material';
import { useAppContext } from 'hooks/utils';
import { Link } from 'components/common';

const NavDrawer: FC = () => {
  const context = useAppContext(NavDrawerContext);
  return (
    <nav>
      <SwipeableDrawer open={context.isOpen} onClose={context.close} onOpen={context.open}>
        <List>
          <ListItem>
            <Link to={'/diagram'} onClick={context.close}>
              Diagram
            </Link>
          </ListItem>
          <ListItem>
            <Link to={'/training'} onClick={context.close}>
              Training
            </Link>
          </ListItem>
          <ListItem>
            <Link to={'exercises'} onClick={context.close}>
              Exercises
            </Link>
          </ListItem>
          <ListItem>
            <Link to={'templates'} onClick={context.close}>
              Templates
            </Link>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </nav>
  );
};

export default NavDrawer;
