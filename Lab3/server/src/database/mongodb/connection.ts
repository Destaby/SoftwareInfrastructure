import * as mongoose from 'mongoose';
import { Type } from '../../types/tools';
import { getModelForClass, getDiscriminatorModelForClass } from '@typegoose/typegoose';
import { IModelOptions } from '@typegoose/typegoose/lib/types';
import { getMongoConnectionOptions } from './helpers';

export class MongooseConnection extends mongoose.Connection {
  public static connect(_mongoose = mongoose) {
    const { uri } = getMongoConnectionOptions();
    // @ts-ignore - tsc claims that MongooseConnection requires 0 arguments, but it is not true
    const conn = new MongooseConnection(_mongoose);

    return conn.openUri(uri) as Promise<MongooseConnection>;
  }

  public useDb(
    name: string,
    options?: { useCache?: boolean; noListener?: boolean }
  ): MongooseConnection {
    return super.useDb(name, options) as MongooseConnection;
  }

  public getModel = <T>(
    c: Type<T>,
    options?: Omit<IModelOptions, 'existingConnection' | 'existingMongoose'>
  ) => {
    return getModelForClass(c, {
      ...options,
      existingConnection: this,
    });
  };

  public getDiscriminatorModel = <T>(from: mongoose.Model<any>, c: Type<T>, value?: string) => {
    return getDiscriminatorModelForClass(from, c, value);
  };
}
