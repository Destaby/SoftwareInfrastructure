import Database from "../database/postgresql/orm";
import Table from "../database/postgresql/table";

interface GroupServiceParams {
  database: Database;
}

export class GroupService {
  public table: Table;

  public constructor({ database }: GroupServiceParams) {
    this.table = new Table(database, 'groups');
  }
};
