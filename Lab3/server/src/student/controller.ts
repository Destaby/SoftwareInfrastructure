import * as express from 'express';
import { StudentService } from './service';
import { Student } from './model';

const app = express();

export default ({ studentService }: { studentService: StudentService }) => {

  app.use(express.json());

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.get('/', async (req, res) => {
    const groups : string[] | undefined = <string[]>req.query.groups;
    let students; //: Student[];
    if (groups === undefined) {
      students = await studentService.storage.find();
    } else {
      const condition = [];
      for (let group of groups) {
        condition.push({group});
      }
      students = await studentService.storage.find({$or: condition});
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
