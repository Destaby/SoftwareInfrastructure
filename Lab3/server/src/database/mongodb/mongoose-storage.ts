import { MongooseConnection } from './connection';
import * as uuid from 'uuid';
import { Type } from '../../types/tools';
import { getModelWithString, ReturnModelType } from '@typegoose/typegoose';
import { CreateArgs, IStorage, IFilter } from './storage-interfaces';
import { getQueryFromFilter } from './filter-helpers';
import { PersistedSchema } from './schema-helpers';

export class MongooseStorage<T extends PersistedSchema> implements IStorage<T> {
  constructor(
    protected connection: MongooseConnection,
    protected schema: Type<T>,
    protected discriminators?: ReadonlyArray<Type<T>>
  ) {
    const model = connection.getModel(schema);
    for (const discriminator of discriminators || []) {
      connection.getDiscriminatorModel(model, discriminator);
    }
  }

  private getQueryFromFilter<TSchema extends T>(filter: IFilter<TSchema>) {
    const query = getQueryFromFilter(filter);
    return query as any;
  }

  public async countDocuments<TSchema extends T>(filter: IFilter<TSchema>) {
    const Model = this.getModel<TSchema>();
    return Model.countDocuments(this.getQueryFromFilter(filter));
  }

  public async find<TSchema extends T>(
    filter: IFilter<TSchema>,
    sortBy?: { [key: string]: 1 | -1 }
  ) {
    const Model = this.getModel<TSchema>();
    return Model.find(this.getQueryFromFilter(filter)).sort(sortBy);
  }

  public async findById<TSchema extends T>(id: string) {
    const Model = this.getModel<TSchema>();
    const model = await Model.findById(id);
    return model || undefined;
  }

  public async findOne<TSchema extends T>(
    filter: IFilter<TSchema>,
    sortBy?: { [key: string]: 1 | -1 }
  ) {
    const Model = this.getModel<TSchema>();
    const model = await Model.findOne(this.getQueryFromFilter(filter)).sort(sortBy);
    return model || undefined;
  }

  public getModel<TSchema extends T>(): ReturnModelType<Type<TSchema>> {
    const Model = getModelWithString(this.schema.name);
    if (!Model) {
      throw new Error(
        `[${this.constructor.name}/${this.schema.name}] could not retrieve Model for schema ${this.schema.name}`
      );
    }
    return Model;
  }

  public async create<TSchema extends T>(obj: CreateArgs<TSchema>): Promise<TSchema> {
    const Model = this.getModel<TSchema>();
    return Model.create({ ...obj, id: uuid.v4() });
  }

  public async createMany<TSchema extends T>(objArr: Array<CreateArgs<TSchema>>) {
    const Model = this.getModel<TSchema>();

    await Model.create(objArr.map((obj) => ({ ...obj, id: uuid.v4() })));
  }

  public async updateById<TSchema extends T>(id: string, doc: Partial<TSchema>) {
    const Model = this.getModel<TSchema>();

    const updateQuery = {
      $set: doc,
    };

    await Model.findByIdAndUpdate(id, updateQuery as any);
  }

  public async deleteOne<TSchema extends T>(filter: IFilter<TSchema>) {
    const Model = this.getModel<TSchema>();
    await Model.findOneAndDelete(getQueryFromFilter(filter));
  }

  public async deleteMany<TSchema extends T>(filter: IFilter<TSchema>) {
    const Model = this.getModel<TSchema>();
    await Model.deleteMany(getQueryFromFilter(filter));
  }
}
