import React, { FC } from 'react';
import { TemplatesProvider } from 'context/Templates';
import { TemplateSelection } from 'components/templates';

const TemplatesPage: FC = () => {
  return (
    <TemplatesProvider>
      <TemplateSelection />
    </TemplatesProvider>
  );
};

export default TemplatesPage;
