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
  currentTemplateId: number | null;
  selectTemplateId: Dispatch<SetStateAction<number | null>>;
}

const TemplatesContext = createContext<Context | null>(null);

const TemplatesProvider: FC<{ children: ReactNode }> = props => {
  const [currentTemplateId, selectTemplateId] = useState<number | null>(null);

  const context = useMemo<Context>(
    () => ({ currentTemplateId, selectTemplateId }),
    [currentTemplateId],
  );

  return <TemplatesContext.Provider value={context}>{props.children}</TemplatesContext.Provider>;
};

export { TemplatesContext, TemplatesProvider };
