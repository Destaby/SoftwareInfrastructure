import * as express from 'express';
import { StudentService } from './service';

const app = express();

export default ({ studentService }: { studentService: StudentService }) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.get('/', async (_, res) => {
    const students = await studentService.storage.find();
    res.json(students).end();
  });

  return app;
};
