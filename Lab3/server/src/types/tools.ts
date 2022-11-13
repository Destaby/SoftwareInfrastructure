export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

export type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;
}[keyof T];
export type JustMethodKeys<T> = { [P in keyof T]: T[P] extends Function ? P : never }[keyof T];
export type OmitMethods<T> = Omit<T, JustMethodKeys<T>>;
