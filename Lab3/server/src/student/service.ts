import { StudentsStorage } from './storage';
import { CreateArgs } from '../database/mongodb/storage-interfaces';
import { Student } from './model';
import * as uuid from 'uuid';

interface StudentServiceParams {
  studentsStorage: StudentsStorage;
}

export class StudentService {
  public storage: StudentsStorage;

  public constructor({ studentsStorage }: StudentServiceParams) {
    this.storage = studentsStorage;
  }

  public async create(student: CreateArgs<Student>) {
    const check = await this.storage.findOne(student);
    if (!check) {
      student.id = uuid.v4();
      await this.storage.create(student);
    }
  }
  
  public async find(groups: string[]) {
    let students : Student[] = [];
    for (let group of groups) {
      let foundStudents = await this.storage.find({group});
      students = students.concat(foundStudents);
    }
    return students;
  }
}
