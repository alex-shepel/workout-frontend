import { Dispatch, SetStateAction } from 'react';

type TStateSetter<T> = Dispatch<SetStateAction<T>>;

export default TStateSetter;
