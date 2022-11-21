import * as express from 'express';
import { StudentService } from './service';

const app = express();

export default ({ studentService }: { studentService: StudentService }) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.use(express.json());

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.get('/', async (req, res) => {
    const group = req.query.group;
    console.log(group);
    let students;
    if (group === undefined) {
      students = await studentService.storage.find();
    } else {
      students = await studentService.storage.find({ group });
    }
    res.json(students).end();
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.post('/', async (req, res) => {
    const student = req.body;
    await studentService.create(student);
    const students = await studentService.storage.find();
    res.json(students).end();
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.delete('/', async (req, res) => {
    const student = req.body;
    await studentService.storage.deleteOne(student);
    const students = await studentService.storage.find();
    res.json(students).end();
  });

  return app;
};
