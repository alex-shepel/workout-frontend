import React, { FC, ReactNode, SyntheticEvent } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useAppContext } from 'hooks/index';
import { TemplatesTabsContext } from 'context/TemplatesTabs';

const TabPanel: FC<{ id: number; children: ReactNode }> = props => {
  const { id, children } = props;
  const { activeId } = useAppContext(TemplatesTabsContext);
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
  LIGHT = 'Light Training',
  MEDIUM = 'Medium Training',
  HARD = 'Hard Training',
}

const shorten = (label: string) =>
  label
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');

const TemplatesTabs: FC = () => {
  const { activeId, setActiveId } = useAppContext(TemplatesTabsContext);

  const handleChange = (event: SyntheticEvent, newActiveId: number) => {
    setActiveId(newActiveId);
  };

  return (
    <Box>
      <Tabs value={activeId} onChange={handleChange} aria-label="Training Templates">
        <Tab
          label={activeId === 0 ? TabsLabels.LIGHT : shorten(TabsLabels.LIGHT)}
          {...a11yProps(0)}
        />
        <Tab
          label={activeId === 1 ? TabsLabels.MEDIUM : shorten(TabsLabels.MEDIUM)}
          {...a11yProps(1)}
        />
        <Tab
          label={activeId === 2 ? TabsLabels.HARD : shorten(TabsLabels.HARD)}
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel id={0}>{TabsLabels.LIGHT}</TabPanel>
      <TabPanel id={1}>{TabsLabels.MEDIUM}</TabPanel>
      <TabPanel id={2}>{TabsLabels.HARD}</TabPanel>
    </Box>
  );
};

export default TemplatesTabs;
