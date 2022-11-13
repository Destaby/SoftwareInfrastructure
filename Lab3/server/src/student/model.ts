import { prop } from '@typegoose/typegoose';
import { PersistedSchema } from '../database/mongodb/schema-helpers';

export class Student extends PersistedSchema {
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  surname!: string;

  @prop({ required: true })
  group!: string;
}
