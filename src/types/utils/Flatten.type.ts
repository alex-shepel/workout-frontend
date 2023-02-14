type Flatten<T> = T extends any[] ? T[number] : T;

export default Flatten;
