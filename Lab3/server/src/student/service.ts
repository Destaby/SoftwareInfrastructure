import { StudentsStorage } from './storage';

interface StudentServiceParams {
  studentsStorage: StudentsStorage;
}

export class StudentService {
  public storage: StudentsStorage;

  public constructor({ studentsStorage }: StudentServiceParams) {
    this.storage = studentsStorage;
  }
}
