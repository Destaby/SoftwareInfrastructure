import Database from '../database/postgresql/orm.js';
import * as uuid from 'uuid';
import { omit } from 'lodash';
import { StudentsStorage } from '../student/storage.js';

export default async ({ studentsStorage, postgresqlDatabase }: {
  studentsStorage: StudentsStorage,
  postgresqlDatabase: Database,
}) => {
  const group = {
    id: uuid.v4(),
    name: 'IP-94',
  }

  const student = {
    id: uuid.v4(),
    name: 'Mykola',
    surname: 'Rudyk',
    group: 'IP-94',
  };

  await Promise.all([
    studentsStorage.deleteMany(omit(student, 'id')),
    postgresqlDatabase.delete('groups', { name: group.name }),
  ])

  await Promise.all([
    studentsStorage.create(student),
    postgresqlDatabase.insert('groups', group)
  ])
};