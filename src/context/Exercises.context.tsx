import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';
import { GroupEntity } from 'types/entities';
import { StateSetter } from 'types/utils';

interface Context {
  currentGroupId: GroupEntity['ID'] | null;
  selectGroupId: StateSetter<GroupEntity['ID'] | null>;
}

const ExercisesContext = createContext<Context | null>(null);

const ExercisesProvider: FC<{ children: ReactNode }> = props => {
  const [currentGroupId, selectGroupId] = useState<GroupEntity['ID'] | null>(null);

  const context = useMemo<Context>(() => ({ currentGroupId, selectGroupId }), [currentGroupId]);

  return <ExercisesContext.Provider value={context}>{props.children}</ExercisesContext.Provider>;
};

export { ExercisesContext, ExercisesProvider };
