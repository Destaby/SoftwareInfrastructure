import * as express from 'express';
import * as uuid from 'uuid';
import { StudentService } from './service';

const app = express();

export default ({ studentService }: { studentService: StudentService }) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.use(express.json());
  
  app.get('/', async (_, res) => {
    const students = await studentService.storage.find();
    res.json(students).end();
  });
  
  app.post('/', async (req, res) => {
    const student = req.body;
    const check = await studentService.storage.findOne(student);
    if (!check) {
      student.id = uuid.v4();
      await studentService.storage.create(student);
    }
    const students = await studentService.storage.find();
    res.json(students).end();
  });
  
  app.delete('/', async (req, res) => {
    const student = req.body;
    await studentService.storage.deleteOne(student);
    const students = await studentService.storage.find();
    res.json(students).end();
  });

  return app;
};
