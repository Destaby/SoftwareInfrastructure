import { Pool } from 'pg';
import { POSTGRESQL_CONNSTRING, } from '../../config';

const OPERATORS = ['>=', '<=', '<>', '>', '<'];

export type Props = {[k in string]: string }

const where = (conditions: Props, firstArgIndex = 1) => {
  const clause = [];
  const args = [];
  let i = firstArgIndex;
  const keys = Object.keys(conditions);
  for (const key of keys) {
    let operator = '=';
    let value = conditions[key];
    if (typeof value === 'string') {
      for (const op of OPERATORS) {
        const len = op.length;
        if (value.startsWith(op)) {
          operator = op;
          value = value.substring(len);
        }
      }
      if (value.includes('*') || value.includes('?')) {
        operator = 'LIKE';
        value = value.replace(/\*/g, '%').replace(/\?/g, '_');
      }
    }
    clause.push(`${key} ${operator} $${i++}`);
    args.push(value);
  }
  return { clause: clause.join(' AND '), args };
};

const updates = (delta: Props, firstArgIndex = 1) => {
  const clause = [];
  const args = [];
  let i = firstArgIndex;
  const keys = Object.keys(delta);
  for (const key of keys) {
    const value = delta[key].toString();
    clause.push(`${key} = $${i++}`);
    args.push(value);
  }
  return { clause: clause.join(', '), args };
};

export default class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({ connectionString: POSTGRESQL_CONNSTRING });
  }

  query(sql: string, values: string[]) {
    return this.pool.query(sql, values);
  }

  insert(table: string, record: Props) {
    const keys = Object.keys(record);
    const nums = new Array(keys.length);
    const data = new Array(keys.length);
    let i = 0;
    for (const key of keys) {
      data[i] = record[key];
      nums[i] = `$${++i}`;
    }
    const fields = keys.join(', ');
    const params = nums.join(', ');
    const sql = `INSERT INTO ${table} (${fields}) VALUES (${params})`;
    return this.query(sql, data);
  }

  async select(table: string, fields = ['*'], conditions?: Props) {
    const keys = fields.join(', ');
    const sql = `SELECT ${keys} FROM ${table}`;
    let whereClause = '';
    let args: string[] = [];
    if (conditions) {
      const whereData = where(conditions);
      whereClause = ' WHERE ' + whereData.clause;
      args = whereData.args;
    }
    const res = await this.query(sql + whereClause, args);
    return res.rows;
  }

  delete(table: string, conditions: Props) {
    const { clause, args } = where(conditions);
    const sql = `DELETE FROM ${table} WHERE ${clause}`;
    return this.query(sql, args);
  }

  update(table: string, delta: Props, conditions: Props) {
    const upd = updates(delta);
    const cond = where(conditions, upd.args.length + 1);
    const sql = `UPDATE ${table} SET ${upd.clause} WHERE ${cond.clause}`;
    const args = [...upd.args, ...cond.args];
    return this.query(sql, args);
  }

  close() {
    this.pool.end();
  }
}
