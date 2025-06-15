export type MswPathParameter<T> = {
  [K in keyof T]: string;
};
