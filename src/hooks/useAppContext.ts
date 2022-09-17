import { Context, useContext } from 'react';

const useAppContext = <T>(context: Context<T | null>) => {
  const contextValue = useContext(context);
  if (contextValue === null) {
    throw Error('Context has not been Provided!');
  }
  return contextValue;
};

export default useAppContext;
