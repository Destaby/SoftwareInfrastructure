import { OmitMethods, WritableKeys } from '../../types/tools';

export type Nullable<T> = { [P in keyof T]: T[P] | null };

export type IFilter<T> =
  | {
      [key: string]: any;
      AND?: IFilterArray<T> | null;
      OR?: IFilterArray<T> | null;
    }
  | Partial<Nullable<T>>;

export type IFilterArray<T> = Array<IFilter<T>>;

export type CreateArgs<TSchema> = OmitMethods<Pick<TSchema, WritableKeys<TSchema>>>;

export interface IStorage<T> {
  countDocuments<TSchema extends T>(filter: IFilter<TSchema>): Promise<number>;
  find<TSchema extends T>(
    filter: IFilter<TSchema>,
    sortBy?: { [key: string]: 1 | -1 }
  ): Promise<TSchema[]>;
  findById<TSchema extends T>(id: string): Promise<TSchema | undefined>;
  findOne<TSchema extends T>(
    filter: IFilter<TSchema>,
    sortBy?: { [key: string]: 1 | -1 }
  ): Promise<TSchema | undefined>;
  updateById<TSchema extends T>(id: string, doc: Partial<TSchema>): Promise<void>;
  create<TSchema extends T>(entity: CreateArgs<TSchema>): Promise<TSchema>;
  createMany<TSchema extends T>(entities: Array<CreateArgs<TSchema>>): Promise<void>;
  deleteOne<TSchema extends T>(filter: IFilter<TSchema>): Promise<void>;
  deleteMany<TSchema extends T>(filter: IFilter<TSchema>): Promise<void>;
}
