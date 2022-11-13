import { IFilter, IStorage, CreateArgs } from './storage-interfaces';
import { PersistedSchema } from './schema-helpers';

export abstract class Storage<TSchema extends PersistedSchema> {
  protected abstract storage: IStorage<TSchema>;

  public count(filter: IFilter<TSchema>) {
    return this.storage.countDocuments(filter);
  }

  public find(filter?: IFilter<TSchema>, sortBy?: { [key: string]: 1 | -1 }) {
    return this.storage.find(filter || {}, sortBy);
  }

  public findById(id: string) {
    return this.storage.findOne({ id });
  }

  public findOne(selector: IFilter<TSchema>, sortBy?: { [key: string]: 1 | -1 }) {
    return this.storage.findOne(selector, sortBy);
  }

  public async create(obj: CreateArgs<TSchema>): Promise<TSchema> {
    return this.storage.create(obj);
  }

  public async createMany(objArr: Array<CreateArgs<TSchema>>) {
    return this.storage.createMany(objArr);
  }

  public async updateById(id: string, doc: Partial<TSchema>) {
    return this.storage.updateById(id, doc);
  }

  public async deleteOne(filter: IFilter<TSchema>) {
    return this.storage.deleteOne(filter);
  }

  public async deleteMany(filter: IFilter<TSchema>) {
    return this.storage.deleteMany(filter);
  }
}
