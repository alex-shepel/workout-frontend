import React, { FC } from 'react';
import { TemplatesProvider } from 'context/Templates';
import { TemplateSelection } from 'components/templates';
import GroupedExercisesAccordion from 'components/templates/GroupedExercisesAccordions/GroupedExercisesAccordion';
import { useQuery } from 'react-query';
import { GroupEntity } from 'types/entities';
import { apiGroups } from 'api/services';

const TemplatesPage: FC = () => {
  const { data: groups } = useQuery<GroupEntity[]>('groups', apiGroups.getAll);

  return (
    <TemplatesProvider>
      <TemplateSelection />
      {groups?.map(group => (
        <GroupedExercisesAccordion key={group.ID} group={group} />
      ))}
    </TemplatesProvider>
  );
};

export default TemplatesPage;
