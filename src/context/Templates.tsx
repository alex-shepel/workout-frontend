import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { TemplateEntity } from 'types/entities';

interface Context {
  currentTemplateId: TemplateEntity['ID'] | null;
  selectTemplateId: Dispatch<SetStateAction<TemplateEntity['ID'] | null>>;
}

const TemplatesContext = createContext<Context | null>(null);

const TemplatesProvider: FC<{ children: ReactNode }> = props => {
  const [currentTemplateId, selectTemplateId] = useState<TemplateEntity['ID'] | null>(null);

  const context = useMemo<Context>(
    () => ({ currentTemplateId, selectTemplateId }),
    [currentTemplateId],
  );

  return <TemplatesContext.Provider value={context}>{props.children}</TemplatesContext.Provider>;
};

export { TemplatesContext, TemplatesProvider };
