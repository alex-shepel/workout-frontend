import React, { FC } from 'react';
import { TemplatesTabs } from 'components/templates';
import { TemplatesTabsProvider } from 'context/TemplatesTabs';

const TemplatesPage: FC = () => {
  return (
    <TemplatesTabsProvider>
      <TemplatesTabs />
    </TemplatesTabsProvider>
  );
};

export default TemplatesPage;
