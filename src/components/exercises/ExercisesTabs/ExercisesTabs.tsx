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

enum TabsLabels {
  ARMS = 'Arms Muscles',
  LEGS = 'Legs Muscles',
  CHEST = 'Chest Muscles',
}

const shorten = (label: string) =>
  label
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');

const ExercisesTabs: FC = () => {
  const { activeId, setActiveId } = useAppContext(ExercisesTabsContext);

  const handleChange = (event: SyntheticEvent, newActiveId: number) => {
    setActiveId(newActiveId);
  };

  return (
    <Box>
      <Tabs value={activeId} onChange={handleChange} aria-label="Muscles Groups">
        <Tab
          label={activeId === 0 ? TabsLabels.ARMS : shorten(TabsLabels.ARMS)}
          {...a11yProps(0)}
        />
        <Tab
          label={activeId === 1 ? TabsLabels.LEGS : shorten(TabsLabels.LEGS)}
          {...a11yProps(1)}
        />
        <Tab
          label={activeId === 2 ? TabsLabels.CHEST : shorten(TabsLabels.CHEST)}
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel id={0}>{TabsLabels.ARMS}</TabPanel>
      <TabPanel id={1}>{TabsLabels.LEGS}</TabPanel>
      <TabPanel id={2}>{TabsLabels.CHEST}</TabPanel>
    </Box>
  );
};

export default ExercisesTabs;
