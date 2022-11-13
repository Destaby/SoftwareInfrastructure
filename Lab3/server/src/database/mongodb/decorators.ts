import { Type } from '../../types/tools';

export const schemaSymbol = Symbol('schema');
export const schemaCtorIndexSymbol = Symbol('schema');
export const discriminatorsSymbol = Symbol('discriminators');

type Props<TSchema> = {
  [schemaSymbol]?: Type<TSchema>;
  [schemaCtorIndexSymbol]?: number;
  [discriminatorsSymbol]?: ReadonlyArray<Type<TSchema>>;
};

export function storage<TSchema>(
  schema: Type<TSchema>,
  discriminators?: ReadonlyArray<Type<TSchema>>
) {
  return <K extends string, T extends Props<TSchema>>(target: T, _: K, index: number) => {
    if (target[schemaSymbol]) {
      throw new Error('Cannot define multiple storages on a single writer');
    }
    target[schemaSymbol] = schema;
    target[schemaCtorIndexSymbol] = index;
    target[discriminatorsSymbol] = discriminators;
  };
}
