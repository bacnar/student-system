import { Professor } from './professor';
import { Student } from './student';

export interface Course {
    id: number,
    professor: Professor,
    students: Array<Student>,
    title: string
}
