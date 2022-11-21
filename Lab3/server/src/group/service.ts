import Database, { Props } from '../database/postgresql/orm';
import Table from '../database/postgresql/table';
import * as uuid from 'uuid';

interface GroupServiceParams {
  database: Database;
}

export class GroupService {
  public table: Table;

  public constructor({ database }: GroupServiceParams) {
    this.table = new Table(database, 'groups');
  }

  public async insert(record: Props) {
    const sameGroups = await this.table.select(['*'], record);
    if (!sameGroups.length) {
      record.id = uuid.v4();
      await this.table.insert(record);
    }
  }
}
