import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';

interface IContext {
  activeId: number;
  setActiveId: (id: number) => void;
}

interface IProvider {
  defaultActiveId?: number;
  children: ReactNode;
}

const TemplatesTabsContext = createContext<IContext | null>(null);

const TemplatesTabsProvider: FC<IProvider> = ({ defaultActiveId = 0, children }) => {
  const [activeId, setActiveId] = useState<number>(defaultActiveId);
  const context = useMemo<IContext>(
    () => ({
      activeId,
      setActiveId,
    }),
    [activeId],
  );
  return <TemplatesTabsContext.Provider value={context}>{children}</TemplatesTabsContext.Provider>;
};

export { TemplatesTabsContext, TemplatesTabsProvider };
