export default interface Service {
  readonly endpoint: string;
  readonly [key: string]: string | ((arg?: any) => Promise<object>);
}
