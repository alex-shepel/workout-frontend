import { Dispatch, SetStateAction } from 'react';

type StateSetter<T> = Dispatch<SetStateAction<T>>;

export default StateSetter;
