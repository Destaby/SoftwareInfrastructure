import { Storage } from '../database/mongodb/storage';
import { storage } from '../database/mongodb/decorators';
import { IStorage } from '../database/mongodb/storage-interfaces';
import { MongooseStorage } from '../database/mongodb/mongoose-storage';
import { Student } from './model';
import { MongooseConnection } from '../database/mongodb/connection';

export class StudentsStorage extends Storage<Student> {
  constructor(@storage(Student) protected storage: IStorage<Student>) {
    super();
  }
}

export default (connection: MongooseConnection) => new StudentsStorage(new MongooseStorage(connection, Student));
