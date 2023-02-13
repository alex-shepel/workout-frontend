import React, { FC } from 'react';
import { TemplatesProvider } from 'context/Templates.context';
import { GroupedExercisesAccordion, TemplateSelection } from 'components/templates';
import { useQuery } from 'react-query';
import { GroupEntity } from 'types/entities';
import { useGroupsService } from 'hooks/services';

const TemplatesPage: FC = () => {
  const groupsService = useGroupsService();

  const { data: groups } = useQuery<GroupEntity[]>(groupsService.endpoint, groupsService.getAll);

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
