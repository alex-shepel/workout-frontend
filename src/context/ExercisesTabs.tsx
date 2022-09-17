import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';

interface IContext {
  activeId: number;
  setActiveId: (id: number) => void;
}

interface IProvider {
  defaultActiveId?: number;
  children: ReactNode;
}

const ExercisesTabsContext = createContext<IContext | null>(null);

const ExercisesTabsProvider: FC<IProvider> = ({ defaultActiveId = 0, children }) => {
  const [activeId, setActiveId] = useState<number>(defaultActiveId);
  const context = useMemo<IContext>(
    () => ({
      activeId,
      setActiveId,
    }),
    [activeId],
  );
  return <ExercisesTabsContext.Provider value={context}>{children}</ExercisesTabsContext.Provider>;
};

export { ExercisesTabsContext, ExercisesTabsProvider };
