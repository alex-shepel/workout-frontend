import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

interface Context {
  currentGroupId: number | null;
  selectGroupId: Dispatch<SetStateAction<number | null>>;
}

const ExercisesContext = createContext<Context | null>(null);

const ExercisesProvider: FC<{ children: ReactNode }> = props => {
  const [currentGroupId, selectGroupId] = useState<number | null>(null);

  const context = useMemo<Context>(() => ({ currentGroupId, selectGroupId }), [currentGroupId]);

  return <ExercisesContext.Provider value={context}>{props.children}</ExercisesContext.Provider>;
};

export { ExercisesContext, ExercisesProvider };
