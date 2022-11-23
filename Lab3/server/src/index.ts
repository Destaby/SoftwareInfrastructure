import * as express from 'express';
import { MongooseConnection } from './database/mongodb/connection.js';
import Database from './database/postgresql/orm.js';
import { PORT, STATIC_PATH } from './config.js';
import { StudentService } from './student';
import { GroupService } from './group/service.js';
import getStudentsStorage from './student/storage';
import getStudents from './student/controller';
import getGroups from './group/controller';
import initDemoData from './demo';

const main = async () => {
  const mongooseConnection = await MongooseConnection.connect();
  const postgresqlDatabase = new Database();

  const studentsStorage = getStudentsStorage(mongooseConnection);

  const studentService = new StudentService({
    studentsStorage,
  });
  const groupService = new GroupService({
    database: postgresqlDatabase,
  });

  const students = getStudents({ studentService });
  const groups = getGroups({ groupService });

  await initDemoData({ studentsStorage, postgresqlDatabase });

  const app = express();
  const cors = require('cors')

  app.use(express.static(STATIC_PATH));

  app.use(cors({
    origin: true
  }))
  app.use('/students', students);
  app.use('/groups', groups);

  app.listen(PORT, () => {
    console.log(`Running on http://127.0.0.1:${PORT}`);
  });

  const shutdown = async (err: any) => {
    await mongooseConnection.close();
    await postgresqlDatabase.close();
    console.log(err);
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  process.on('uncaughtException', shutdown);
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  process.on('unhandledRejection', shutdown);
};

main().catch((err) => {
  console.log(err);
});
