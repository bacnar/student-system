import { Professor } from './professor';
import { Student } from './student';

export interface Course {
    id: string,
    professor_id: string
    students: string[],
    title: string
}

export interface ImprovedCourse {
    id: string,
    professor: Professor,
    students: Array<Student>,
    title: string
}

export interface CourseSelect {
    label: string,
    value: Course
  }
