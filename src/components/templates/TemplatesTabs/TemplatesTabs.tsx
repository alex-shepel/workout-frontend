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

const TemplatesTabs: FC = () => {
  const { activeId, setActiveId } = useAppContext(TemplatesTabsContext);

  const handleChange = (event: SyntheticEvent, newActiveId: number) => {
    setActiveId(newActiveId);
  };

  return (
    <Box>
      <Tabs value={activeId} onChange={handleChange} aria-label="Muscles Groups">
        <Tab label="Light Training Template" {...a11yProps(0)} />
        <Tab label="Medium Training Template" {...a11yProps(1)} />
        <Tab label="Hard Training Template" {...a11yProps(2)} />
      </Tabs>
      <TabPanel id={0}>Light Training Template</TabPanel>
      <TabPanel id={1}>Medium Training Template</TabPanel>
      <TabPanel id={2}>Hard Training Template</TabPanel>
    </Box>
  );
};

export default TemplatesTabs;
