import Database, { Props } from './orm';

export default class Table {
  constructor(protected readonly database: Database, protected readonly table: string) {}

  insert(record: Props) {
    return this.database.insert(this.table, record);
  }

  select(fields = ['*'], conditions?: Props) {
    return this.database.select(this.table, fields, conditions);
  }

  delete(conditions: Props) {
    return this.database.delete(this.table, conditions)
  }

  update(delta: Props, conditions: Props) {
    return this.database.update(this.table, delta, conditions)
  }

  close() {
    this.database.close();
  }
}
