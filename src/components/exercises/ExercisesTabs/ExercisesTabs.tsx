import React, { FC, ReactNode, SyntheticEvent } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useAppContext } from 'hooks/index';
import { ExercisesTabsContext } from 'context/ExercisesTabs';

const TabPanel: FC<{ id: number; children: ReactNode }> = props => {
  const { id, children } = props;
  const { activeId } = useAppContext(ExercisesTabsContext);
  return (
    <Box
      role="tabpanel"
      hidden={activeId !== id}
      id={`simple-tabpanel-${id}`}
      aria-labelledby={`simple-tab-${id}`}
    >
      <Typography>{children}</Typography>
    </Box>
  );
};

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const ExercisesTabs: FC = () => {
  const { activeId, setActiveId } = useAppContext(ExercisesTabsContext);

  const handleChange = (event: SyntheticEvent, newActiveId: number) => {
    setActiveId(newActiveId);
  };

  return (
    <Box>
      <Tabs value={activeId} onChange={handleChange} aria-label="Muscles Groups">
        <Tab label="Arms Muscles" {...a11yProps(0)} />
        <Tab label="Legs Muscles" {...a11yProps(1)} />
        <Tab label="Chest Muscles" {...a11yProps(2)} />
      </Tabs>
      <TabPanel id={0}>Arms Muscles</TabPanel>
      <TabPanel id={1}>Legs Muscles</TabPanel>
      <TabPanel id={2}>Chest Muscles</TabPanel>
    </Box>
  );
};

export default ExercisesTabs;
