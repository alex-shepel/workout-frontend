import { Service } from 'types/common';

type ServiceHook = () => Service;

type Endpoint<T extends ServiceHook> = ReturnType<T>['endpoint'];

type ExtraServiceKey<T extends ServiceHook> = `${Endpoint<T>}-${string}`;

export default ExtraServiceKey;
