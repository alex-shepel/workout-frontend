type TMap<Value extends any, Key extends string | number = string> = {
  [key in Key]: Value;
};

export default TMap;
