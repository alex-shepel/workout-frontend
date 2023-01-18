import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';

interface Context {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const NavDrawerContext = createContext<Context | null>(null);

const NavDrawerProvider: FC<{ children: ReactNode }> = props => {
  const [state, setState] = useState<boolean>(false);
  const context = useMemo<Context>(
    () => ({
      isOpen: state,
      open: () => setState(true),
      close: () => setState(false),
      toggle: () => setState(s => !s),
    }),
    [state],
  );
  return <NavDrawerContext.Provider value={context}>{props.children}</NavDrawerContext.Provider>;
};

export { NavDrawerContext, NavDrawerProvider };
